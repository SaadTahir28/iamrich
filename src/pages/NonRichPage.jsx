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
	const { user, isLoggedIn, logout, showHiroLogin } = useUser();
	const [richestPerson, setRichestPerson] = useState(null);
	const [richestPersonAmount, setRichestPersonAmount] = useState(0);

	useEffect(() => {
		HiroService.getLastTransactionAmount()
			.then(result => console.log(result));
	}, [richestPerson]);

	useEffect(() => {
		HiroService.getRichestPerson()
			.then(res => {
				setRichestPersonAmount(res.stacks);
				console.log('RPA', richestPersonAmount);
			});
	}, [richestPersonAmount]);

	const onConnectClick = () => showHiroLogin();
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
