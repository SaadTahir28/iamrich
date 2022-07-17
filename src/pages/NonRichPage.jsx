import {useNavigate } from 'react-router-dom';
import { AppConfig, showConnect, UserSession } from '@stacks/connect-react';
import { Button, Text } from '@chakra-ui/react';

import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import LottieAnimation from '../components/LottieAnimation';
import money from '../assets/animations/money.json';
import Page from '../components/layout/Page';
import { useEffect, useState } from 'react';
import Buttons from '../assets/styles/components/buttons';
import HiroService from '../services/HiroService';
import * as constants from '../util/constants';
import Util from '../util';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function NonRichPage() {
	const [userSignedIn, setUserSignedIn] = useState(false); 
	const [richestPerson, setRichestPerson] = useState(null);
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);
	const [nextRichestPersonAmount, setNextRichestPersonAmount] = useState(0);
	const [amountCommission, setAmountCommission] = useState(0);

	let navigate = useNavigate()
		
	useEffect(() => {
		HiroService.getRichestPerson()
		.then(result => {
			console.log(result)
			setRichestPerson(result);
		});
	}, [richestPerson]);

	useEffect(() => {
		HiroService.getLastTransactionAmount()
			.then(result => {
				setRichestPersonAmount(result.stacks)
				console.log('Richest', richestPersonAmount);
			});
		}, [richestPersonAmount]);

	useEffect(() => {
		HiroService.getNextTransactionAmount()
			.then(result => {
				setNextRichestPersonAmount(result.stacks);
				console.log('nextRichestPersonAmount', nextRichestPersonAmount);
			});
		HiroService.getAmountCommission(Util.convertAmountInMicroStacks(nextRichestPersonAmount))
		.then(result => {
			setAmountCommission(result.amount);
			console.log('amountCommission', amountCommission);
		});
	}, [nextRichestPersonAmount, amountCommission]);

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

	const onConnectClick = () => {
		console.log("onConnectClick");
		showConnect({
			appDetails: {
				name: constants.appName,
				icon: window.location.origin + '/my-app-logo.svg'
			},
			redirectTo: '/',
			onFinish: () => {
				if(richestPerson === getUserAddress()) {
					//navigate to richest page
					navigate(`/rich-person`);
				} else {
					//stay here
					window.location.reload();
				}
			},
			userSession: userSession
		});
	}

	function onLogoutClick(){
		console.log("onLogoutClick");
		userSession.signUserOut("/");
	}

	function onRichClick(){
		console.log("onRichClick");
		if(richestPerson === getUserAddress()) {
			//navigate to richest page
			navigate(`/rich-person`);
		} else {
			HiroService.becomeRichest(getUserAddress(), amountCommission);
		}		
	}

	function getUserAddress(){
		return userSession.loadUserData().profile.stxAddress.testnet;
	}

	// const onConnectClick = () => showHiroLogin();
	// const onLogoutClick = () => hiroLogout();
	// const onRichClick = () => HiroService.becomeRichest(user.profile.stxAddress.testnet, amountCommission)

	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={userSignedIn ? onLogoutClick : onConnectClick} size='md'>
					{userSignedIn ? getUserAddress() : 'Connect'}
				</Button>
			</PageSection>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Text fontSize='l' textAlign='center'><b>Network: </b>Testnet</Text>
			</PageSection>
			<PageSection alignItems='center' flexDirection='column'>
				<LottieAnimation data={money} />
				<Text fontSize='l' textAlign='center'>Want to show your friends your are rich?</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					Current richest person is <i><b>{richestPerson}</b></i> with <i><b>{richestPersonAmount} STX</b></i>
				</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					You can become the next richest person with <i><b>{nextRichestPersonAmount} STX</b></i>
				</Text>
				<Button onClick={onRichClick} size='lg' mt='8' {...Buttons.variants.red} disabled={!userSignedIn}>
					I am rich
				</Button>
			</PageSection>
		</Page>
	);
}
