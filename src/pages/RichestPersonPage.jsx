import PageSection from '../components/layout/PageSection';
import { StyleVariables } from '../assets/styles/variables';
import { Button, Text } from '@chakra-ui/react';
import LottieAnimation from '../components/LottieAnimation';
import gemAnimation from '../assets/animations/gem-animation.json';
import Page from '../components/layout/Page';
import useUser from '../data/hooks/useUser';

export default function RichestPersonPage() {
	const { user, hiroLogout } = useUser();

	const onLogoutClick = () => hiroLogout();

	return (
		<Page>
			<PageSection minH={StyleVariables.NavbarHeight} justifyContent='flex-end'>
				<Button onClick={onLogoutClick} size='md'>{user.id}</Button>
			</PageSection>
			<PageSection padding={0} alignItems='center' flexDirection='column'>
				<LottieAnimation data={gemAnimation} />
				<Text fontSize='3xl' fontWeight='600'>You are the richest person</Text>
				<Text fontSize='6xl' fontWeight='800'>{user.amount}</Text>
			</PageSection>
		</Page>
	);
}
