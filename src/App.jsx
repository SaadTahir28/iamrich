import './assets/styles/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from './navigation';
import theme from './assets/styles/theme';
import { AppConfig, UserSession } from '@stacks/connect-react';
import { useEffect } from 'react';
import useUser from './data/hooks/useUser';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function App() {
	const { login } = useUser();

	// Handle post-auth userData
	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => login(userData));
		} else if (userSession.isUserSignedIn()) {
		}
	}, []);

	return (
		<ChakraProvider theme={theme}>
			<Navigation />
		</ChakraProvider>
	);
}
