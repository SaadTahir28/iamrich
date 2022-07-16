const Util = {
	convertAmountInStacks(microStacks) {
		return microStacks / 1000000;
	},

	convertAmountInMicroStacks(stacks) {
		return stacks * 1000000;
	}
};

export default Util;
