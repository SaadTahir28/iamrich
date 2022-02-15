import * as constants from '../util/constants';
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import Util from '../util';

const network = new StacksTestnet();

export default class HiroService {
	static async getRichestPerson() {
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.getCurrentRichest,
			functionArgs: [],
			network,
			senderAddress: constants.contractAddress
		};

		try {
			const result = await callReadOnlyFunction(options);
			return cvToValue(result);
		} catch (err) {
			return null;
		}
	}

	static async getLastTransactionAmount() {
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.getLastTransactionAmount,
			functionArgs: [],
			network,
			senderAddress: constants.contractAddress
		};

		try {
			const result = await callReadOnlyFunction(options);
			const response = cvToValue(result);
			return {
				amount: Number(response),
				stacks: Util.convertAmountInStacks(Number(response))
			};
		} catch (err) {
			return null;
		}
	}
};
