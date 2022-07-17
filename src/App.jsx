import './assets/styles/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from './navigation';
import theme from './assets/styles/theme';

export default function App() {

	return (
		<ChakraProvider theme={theme}>
			<Navigation />
		</ChakraProvider>
	);
}
