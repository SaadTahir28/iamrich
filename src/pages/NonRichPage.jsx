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

export default function NonRichPage() {
	const { user, isLoggedIn, logout } = useUser();
	const [richestPerson, setRichestPerson] = useState(null);

	useEffect(() => {
		BackendService.getRichestPerson()
			.then(person => setRichestPerson(person))
			.catch(e => console.log(e));
	}, []);

	const onConnectClick = () => console.log('Connect here');
	const onLogoutClick = () => logout();
	const onRichClick = () => console.log('Handle api call here');

	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={isLoggedIn ? onConnectClick : onLogoutClick} size='md'>
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
			</PageSection>
		</Page>
	);
}
