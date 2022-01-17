import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import gemAnimation from '../assets/animations/gem-animation.json';
import Page from '../components/layout/Page';
import { useEffect, useState } from 'react';
import Buttons from '../assets/styles/components/buttons';
import useUser from '../data/hooks/useUser';
import BackendService from '../services/BackendService';
import { callReadOnlyFunction } from "@stacks/transactions";
import { AppConfig, showConnect, UserSession } from '@stacks/connect-react';
import { StacksTestnet } from "@stacks/network";

const network = new StacksTestnet();
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function NonRichPage() {
	const { user, isLoggedIn, logout } = useUser();
	const [richestPerson, setRichestPerson] = useState(null);

	useEffect(() => {
		BackendService.getRichestPerson()
			.then(person => setRichestPerson(person))
			.catch(e => console.log(e));
	}, []);

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
	const handleSubmit = async (e) => {
		const contractAddress = "ST5GACDNGCT91KQYMHFQ6BDDFS034RQK5FX4JSWW";
		const contractName = "richirich";
		const functionName = "get-current-richest";
	
		const options = {
		  contractAddress,
		  contractName,
		  functionName,
		  functionArgs: [],
		  network,
		  senderAddress: "ST5GACDNGCT91KQYMHFQ6BDDFS034RQK5FX4JSWW",
		};
	
		try {
		  const result = await callReadOnlyFunction(options);
		  console.log(result);
		  console.log("Function Succeded: " + result.value);
		} catch (err) {
		  console.log(err);
		  console.log("Function failed with error: " + err); // TypeError: failed to fetch
		}
	  };

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
					Current richest person is with {richestPerson?.amount || '...'}
				</Text>
				<Button onClick={onRichClick} size='lg' mt='8' {...Buttons.variants.red} disabled={!isLoggedIn}>
					I am rich
				</Button>
				<Button onClick={handleSubmit} size='lg' mt='8' {...Buttons.variants.red}> CLICK ME </Button>

			</PageSection>
		</Page>
	);
}

function getCurrentRichest() {

	const handleSubmit = async (e) => {
		console.log("getCurrentRichest");
	}

	return (
		<Button onClick={handleSubmit} size='lg' mt='8' {...Buttons.variants.red}> CLICK ME </Button>
	)
}
