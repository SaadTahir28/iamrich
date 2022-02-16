import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import gemAnimation from '../assets/animations/gem-animation.json';
import Page from '../components/layout/Page';
import { useEffect, useState } from 'react';
import Buttons from '../assets/styles/components/buttons';
import { 
	callReadOnlyFunction, 
	cvToValue, 
	PostConditionMode, 
	FungibleConditionCode, 
	makeStandardSTXPostCondition,
	uintCV } from "@stacks/transactions";
import { AppConfig, showConnect, UserSession, openContractCall } from '@stacks/connect-react';
import { StacksTestnet } from "@stacks/network";
import * as constants from "../util/constants";
import BN from "bn.js";

const network = new StacksTestnet();
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function ConvertAmountInStacks(microStacks) {
	return microStacks / 1000000;
}

export default function NonRichPage() {
	const [userData, setUserData] = useState(null)
	const [richestPerson, setRichestPerson] = useState(null);
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);
	const [nextRichestPersonAmount, setNextRichestPersonAmount] = useState(0);
	const [amountCommission, setAmountCommission] = useState(0);

	useEffect(() => {
		if (userSession.isSignInPending()) {
		  userSession.handlePendingSignIn().then((userData) => {
			console.log("handlePendingSignIn: " + userData);
			setUserData(userData);
		  });
		} else if (userSession.isUserSignedIn()) {
		  console.log("already signed in");
		  const userData = userSession.loadUserData();
		  setUserData(userData);
		} else {
		  console.log("signed out");
		}
	  }, []);

	useEffect(() => {
		async function handleSubmit() {
			const options = {
				contractAddress: constants.contractAddress,
				contractName: constants.contractName,
				functionName: constants.getCurrentRichest,
				functionArgs: [],
				network,
				senderAddress: constants.contractAddress,
			};
			try {
				const result = await callReadOnlyFunction(options);
				const response = cvToValue(result);
				setRichestPerson(response);
			} catch (err) {
				console.log(err);
			}
		}
		handleSubmit();
	}, [richestPerson]);

	useEffect(() => {
		async function handleSubmit() {
			const options = {
				contractAddress: constants.contractAddress,
				contractName: constants.contractName,
				functionName: constants.getLastTransactionAmount,
				functionArgs: [],
				network,
				senderAddress: constants.contractAddress,
			};
			try {
				const result = await callReadOnlyFunction(options);
				const response = cvToValue(result);
				setRichestPersonAmount(Number(response));
				console.log("RPA", richestPersonAmount)
			} catch (err) {
				console.log(err);
			}
		}
		handleSubmit();
	}, [richestPersonAmount]);

	useEffect(() => {
		async function handleSubmit() {
			const options = {
				contractAddress: constants.contractAddress,
				contractName: constants.contractName,
				functionName: constants.getNextTransactionAmount,
				functionArgs: [],
				network,
				senderAddress: constants.contractAddress,
			};
			try {
				const result = await callReadOnlyFunction(options);
				const response = cvToValue(result);
				setNextRichestPersonAmount(Number(response));
			} catch (err) {
				console.log(err);
			}
		}
		handleSubmit();
	}, [nextRichestPersonAmount]);

	useEffect(() => {
		async function handleSubmit() {
			const options = {
				contractAddress: constants.contractAddress,
				contractName: constants.contractName,
				functionName: constants.getAmountCommission,
				functionArgs: [uintCV(nextRichestPersonAmount)],
				network,
				senderAddress: constants.contractAddress,
			};
			try {
				const result = await callReadOnlyFunction(options);
				const response = cvToValue(result);
				setAmountCommission(response);
			} catch (err) {
				console.log(err);
			}
		}
		handleSubmit();
	}, [amountCommission]);

	const onConnectClick = () => {
		showConnect({
			appDetails: {
				name: constants.appName,
				icon: window.location.origin + constants.logo
			},
			redirectTo: '/',
			onFinish: () => {
				// Save or otherwise utilize userData post-authentication
				setUserData(userSession.loadUserData())
			},
			userSession: userSession
		});
	};
	const onLogoutClick = () => userSession.signUserOut("/")

	const onRichClick = async () => {
		console.log('Handle api call here');
		const stxPostCondition = makeStandardSTXPostCondition(
			userData?.profile.stxAddress.testnet,
			FungibleConditionCode.Equal,
			new BN(amountCommission)
		  );
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.becomeRichest,
			functionArgs: [],
			appDetails: {
			  name: constants.appName,
			  icon: window.location.origin + constants.logo,
			},
			network,
			userSession,
			postConditions: [stxPostCondition],
			postConditionCode: PostConditionMode.Deny,
			onFinish: (data) => {
			  console.log("Stacks Transaction:", data.stacksTransaction);
			  console.log("Transaction ID:", data.txId);
			  console.log("Raw transaction:", data.txRaw);
			},
		  };
		  await openContractCall(options);
	}
	
	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={userSession.isUserSignedIn() ? onLogoutClick : onConnectClick} size='md'>
					{userSession.isUserSignedIn() ? userData?.profile.stxAddress.testnet : 'Connect'}
				</Button>
			</PageSection>
			<PageSection alignItems='center' flexDirection='column'>
				<LottieAnimation data={gemAnimation} />
				<Text fontSize='l' textAlign='center'>Want to show your friends your are rich?</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					Current richest person is <i><b>{richestPerson}</b></i> with <i><b>{ConvertAmountInStacks(richestPersonAmount)} STX</b></i>
				</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					You can become the next richest person with <i><b>{ConvertAmountInStacks(nextRichestPersonAmount)} STX</b></i>
				</Text>
				<Button onClick={onRichClick} size='lg' mt='8' {...Buttons.variants.red} disabled={!userSession.isUserSignedIn()}>
					I am rich
				</Button>
			</PageSection>
		</Page>
	);
}
