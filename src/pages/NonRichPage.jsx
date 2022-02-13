import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import gemAnimation from '../assets/animations/gem-animation.json';
import Page from '../components/layout/Page';
import { useEffect, useState } from 'react';
import Buttons from '../assets/styles/components/buttons';
import useUser from '../data/hooks/useUser';
import { callReadOnlyFunction, cvToValue, cvToString } from "@stacks/transactions";
import { AppConfig, showConnect, UserSession } from '@stacks/connect-react';
import { StacksTestnet } from "@stacks/network";
import * as constants from "../util/constants";

const BigNum = require("bn.js");

const network = new StacksTestnet();
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function ConvertAmountInStacks(microStacks) {
	return microStacks / 1000000;
}

export default function NonRichPage() {
	const { user, isLoggedIn, logout } = useUser();
	const [richestPerson, setRichestPerson] = useState(null);
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);

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
				const amountInStacks = ConvertAmountInStacks(Number(response));
				setRichestPersonAmount(amountInStacks);
				console.log("RPA", richestPersonAmount)
			} catch (err) {
				console.log(err);
			}
		}
		handleSubmit();
	}, [richestPersonAmount]);

	const onConnectClick = () => {
		showConnect({
			appDetails: {
				name: 'iamrich',
				icon: window.location.origin + '/my-app-logo.svg'
			},
			redirectTo: '/',
			onFinish: () => {
				let userData = userSession.loadUserData();
				// Save or otherwise utilize userData post-authentication
				console.log(userData);
			},
			userSession: userSession
		});
	};
	const onLogoutClick = () => logout();
	const onRichClick = () => console.log('Handle api call here');
	
	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={isLoggedIn ? onLogoutClick : onConnectClick} size='md'>
					{isLoggedIn ? user.id : 'Connect'}
				</Button>
			</PageSection>
			<PageSection alignItems='center' flexDirection='column'>
				<LottieAnimation data={gemAnimation} />
				<Text fontSize='l' textAlign='center'>Want to show your friends your are rich?</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					Current richest person is <i><b>{richestPerson}</b></i> with <i><b>{richestPersonAmount} STX</b></i>
				</Text>
				<Button onClick={onRichClick} size='lg' mt='8' {...Buttons.variants.red} disabled={!isLoggedIn}>
					I am rich
				</Button>

			</PageSection>
		</Page>
	);
}
