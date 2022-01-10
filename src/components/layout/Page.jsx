import { Box } from '@chakra-ui/react';

export default function Page({ backgroundColor, ...props }) {
	return (
		<Box className='page' minH='100vh' backgroundColor={backgroundColor} overflowY="auto">
			{props.children}
		</Box>
	);
}
