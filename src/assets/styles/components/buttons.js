import { Colors, StyleVariables } from '../variables';

const Buttons = {
	// The styles all button have in common
	baseStyle: {
		fontWeight: '600',
		borderRadius: 'base',
		textTransform: 'uppercase',
		lineHeight: 'normal'
	},

	sizes: {
		sm: {
			fontSize: 'sm',
			px: 4, // <-- px is short for paddingLeft and paddingRight
			py: 3 // <-- py is short for paddingTop and paddingBottom
		},
		md: {
			fontSize: 'md',
			px: 6,
			py: 4
		},
		lg: {
			fontSize: 'lg',
			px: 14,
			py: 8
		}
	},

	// Two variants: outline and solid
	variants: {
		outline: {
			border: '2px solid',
			borderColor: Colors.SecondaryColor,
			color: Colors.ChakraAccentColor,
			_hover: {
				borderColor: Colors.ChakraAccentColorDark,
				color: Colors.ChakraAccentColorDark
			}
		},
		solid: {
			bg: Colors.SecondaryColor,
			color: 'white',
			_hover: {
				bg: Colors.SecondaryColorDark
			}
		},
		link: {
			color: Colors.ChakraAccentColor,
			_hover: {
				color: Colors.ChakraAccentColorDark
			}
		},

		// Custom
		red :{
			bg: Colors.Red,
			color: 'white',
			_hover: {
				bg: Colors.Red
			}
		}
	},

	// The default size and variant values
	defaultProps: StyleVariables.Button
};

export default Buttons;
