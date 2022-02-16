import * as constants from '../util/constants';
import { 
	callReadOnlyFunction, 
	cvToValue, 
	PostConditionMode, 
	FungibleConditionCode, 
	makeStandardSTXPostCondition,
	uintCV } from "@stacks/transactions";
import { openContractCall } from '@stacks/connect-react';
import { StacksTestnet } from '@stacks/network';
import Util from '../util';
import BN from "bn.js";

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
			return err;
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
			return err;
		}
	}

	static async getNextTransactionAmount() {
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.getNextTransactionAmount,
			functionArgs: [],
			network,
			senderAddress: constants.contractAddress,
		};
		try {
			const result = await callReadOnlyFunction(options);
			const response = cvToValue(result);
			return {
				amount: Number(response),
				stacks: Util.convertAmountInStacks(Number(response))
			};
		} catch (err) {
			return err;
		}
	}

	static async getAmountCommission(amount) {
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.getAmountCommission,
			functionArgs: [uintCV(amount)],
			network,
			senderAddress: constants.contractAddress,
		};
		try {
			const result = await callReadOnlyFunction(options);
			const response = cvToValue(result);
			return {
				amount: Number(response),
				stacks: Util.convertAmountInStacks(Number(response))
			};
		} catch (err) {
			return err;
		}
	}

	static async becomeRichest(address, commission) {
		console.log('Handle api call here');
		const stxPostCondition = makeStandardSTXPostCondition(
			address,
			FungibleConditionCode.Equal,
			new BN(commission)
		  );
		const options = {
			contractAddress: constants.contractAddress,
			contractName: constants.contractName,
			functionName: constants.becomeRichest,
			functionArgs: [],
			appDetails: {
			  name: constants.appName,
			  icon: window.location.origin + constants.logo,
			},
			network,
			postConditions: [stxPostCondition],
			postConditionCode: PostConditionMode.Deny,
			onFinish: (data) => {
			  console.log("Stacks Transaction:", data.stacksTransaction);
			  console.log("Transaction ID:", data.txId);
			  console.log("Raw transaction:", data.txRaw);
			},
		  };
		  await openContractCall(options);
	}
	
};
