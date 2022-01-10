import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import Buttons from './components/buttons';
import colors from './colors';
import { StyleVariables } from './variables';

const overrides = {
	styles,
	colors,
	fonts: {
		body: StyleVariables.FontFamily,
		heading: StyleVariables.FontFamilyHeading,
	},
	components: {
		Button: Buttons,
	},
};

export default extendTheme(overrides);
