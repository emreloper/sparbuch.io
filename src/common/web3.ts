/// <reference path="web3.d.ts" />

import Web3 from 'web3/dist/web3.min';
import { BatchRequest, provider } from 'web3-core';
import { AbiItem } from 'web3-utils';

const DEFAULT_PROVIDER = 'https://bsc-dataseed1.binance.org';

export const createWeb3 = (provider: provider = DEFAULT_PROVIDER) =>
  new Web3(provider);

export const createContract = (web3: Web3, AbiItem: AbiItem, address: string) =>
  new web3.eth.Contract(AbiItem, address);

export const createBatchRequest = <Data>(batch: BatchRequest, call: any) =>
  new Promise<Data>((resolve, reject) => {
    const request = call.request((error: any, data: Data) => {
      if (error) reject(error);
      else resolve(data);
    });

    batch.add(request);
  });

export const watchAsset = (options: {
  address: string; // The address that the token is at.
  symbol: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals: string; // The number of decimals in the token
  image?: string; // A string url of the token logo
}) => {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  // @ts-ignore
  return window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options,
    },
  });
};
