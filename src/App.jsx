import './assets/styles/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from './navigation';
import theme from './assets/styles/theme';
import { AppConfig, UserSession } from '@stacks/connect-react';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function App() {

	return (
		<ChakraProvider theme={theme}>
			<Navigation />
		</ChakraProvider>
	);
}
