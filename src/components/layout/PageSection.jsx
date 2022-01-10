import { StyleVariables } from '../../assets/styles/variables';
import { Box } from '@chakra-ui/react';

export default function PageSection({ ...props }) {
	const { children, ...opts } = props;
	return (
		<Box
			display='flex'
			{...opts}
			padding={null}
			paddingX={StyleVariables.BodyPadding}
			paddingY={opts.hasOwnProperty('padding') ? opts.padding || opts.paddingY : StyleVariables.BodyPadding}
			className='page-section'
			maxW={StyleVariables.MaxWidth}
			marginX='auto'
		>
			{props.children}
		</Box>
	);
}
