import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import gemAnimation from '../assets/animations/gem-animation.json';
import Page from '../components/layout/Page';
import { useEffect, useState } from 'react';
import Buttons from '../assets/styles/components/buttons';
import useUser from '../data/hooks/useUser';
import HiroService from '../services/HiroService';

export default function NonRichPage() {
	const { user, isLoggedIn, hiroLogout, showHiroLogin } = useUser();
	const [richestPerson, setRichestPerson] = useState(null);
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);
	const [nextRichestPersonAmount, setNextRichestPersonAmount] = useState(0);
	const [amountCommission, setAmountCommission] = useState(0);
		
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
		HiroService.getAmountCommission()
			.then(result => {
				setAmountCommission(result.stacks);
				console.log('amountCommission', amountCommission);
			});
	}, [amountCommission]);

	useEffect(() => {
		HiroService.getNextTransactionAmount()
			.then(result => {
				setNextRichestPersonAmount(result.stacks);
				console.log('nextRichestPersonAmount', nextRichestPersonAmount);
			});
	}, [nextRichestPersonAmount]);

	const onConnectClick = () => showHiroLogin();
	const onLogoutClick = () => hiroLogout();
	const onRichClick = () => HiroService.becomeRichest(user.profile.stxAddress.testnet, amountCommission)

	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={isLoggedIn() ? onLogoutClick : onConnectClick} size='md'>
					{isLoggedIn() ? user.profile.stxAddress.testnet : 'Connect'}
				</Button>
			</PageSection>
			<PageSection alignItems='center' flexDirection='column'>
				<LottieAnimation data={gemAnimation} />
				<Text fontSize='l' textAlign='center'>Want to show your friends your are rich?</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					Current richest person is <i><b>{richestPerson}</b></i> with <i><b>{richestPersonAmount} STX</b></i>
				</Text>
				<Text fontSize='2xl' mt='2' textAlign='center'>
					You can become the next richest person with <i><b>{nextRichestPersonAmount} STX</b></i>
				</Text>
				<Button onClick={onRichClick} size='lg' mt='8' {...Buttons.variants.red} disabled={!isLoggedIn()}>
					I am rich
				</Button>
			</PageSection>
		</Page>
	);
}
