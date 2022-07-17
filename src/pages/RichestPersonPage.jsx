import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import moeda from '../assets/animations/moeda.json';
import Page from '../components/layout/Page';
import { AppConfig, UserSession } from '@stacks/connect-react';
import { useEffect, useState } from 'react';
import HiroService from '../services/HiroService';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function RichestPersonPage() {
	const [userSignedIn, setUserSignedIn] = useState(false); 
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);

	useEffect(() => {
		HiroService.getLastTransactionAmount()
			.then(result => {
				setRichestPersonAmount(result.stacks)
				console.log('Richest', richestPersonAmount);
			});
		}, [richestPersonAmount]);
		
	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
			  console.log("handlePendingSignIn: " + userData);
			});
		  } else if (userSession.isUserSignedIn()) {
			console.log("already signed in");
			setUserSignedIn(true);
		  } else {
			console.log("signed out");
			setUserSignedIn(false);
		  }
	}, [userSignedIn]);

	function onLogoutClick(){
		console.log("onLogoutClick");
		userSession.signUserOut("/");
	}

	function getUserAddress(){
		return userSession.loadUserData().profile.stxAddress.testnet;
	}

	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={onLogoutClick} size='md'>{getUserAddress()}</Button>
			</PageSection>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Text fontSize='l' textAlign='center'><b>Network: </b>Testnet</Text>
			</PageSection>
			<PageSection padding={0} alignItems='center' flexDirection='column'>
				<LottieAnimation data={moeda} />
				<Text fontSize='3xl' fontWeight='600'>You are the richest person with</Text>
				<Text fontSize='6xl' fontWeight='800'>{richestPersonAmount} STX</Text>
			</PageSection>
		</Page>
	);
}
