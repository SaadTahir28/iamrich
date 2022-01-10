import { Colors } from './variables';
import typography from './foundations/typography';

const styles = {
	global: {
		body: {
			bg: Colors.ChakraBackgroundColor,
			color: Colors.ChakraTextColor,
			lineHeight: 'base',
		},

		/** Typography */
		...typography,
	},
};

export default styles;
