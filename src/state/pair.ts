import { selectorFamily } from 'recoil';
import { createBatchRequest, createContract, createWeb3 } from '../common/web3';
import ABI_PancakePair from '../abis/PancakePair.json';
import ABI_ERC20 from '../abis/ERC20.json';
import Web3 from 'web3/dist/web3.min';
import { BigNumber, FixedNumber } from '@ethersproject/bignumber';
import { priceQuery } from './price';

export interface Token {
  address: string;
  decimals: string;
  name: string;
  symbol: string;
  price_busd: FixedNumber;
}

export interface Pair {
  address: string;
  decimals: string;
  reserve0: FixedNumber;
  reserve1: FixedNumber;
  reserve0_perlp: FixedNumber;
  reserve1_perlp: FixedNumber;
  totalSupply: FixedNumber;
  price0: FixedNumber;
  price1: FixedNumber;
  price_busd: FixedNumber;
  totalLiquidity_busd: FixedNumber;
  token0: Token;
  token1: Token;
}

export const pairQuery = selectorFamily<Pair, string>({
  key: 'pair',
  get: (address: string) => async ({ get }) => {
    const web3 = createWeb3();
    const price = get(priceQuery);

    const pair = await createPair(web3, address.toLowerCase(), price);

    return pair;
  },
});

const createPair = async (
  web3: Web3,
  pairAddress: string,
  price: Record<string, { price_busd: FixedNumber }>
) => {
  const pairData = await fetchPairData(web3, pairAddress);
  const tokensData = await fetchTokensData(web3, [pairData[2], pairData[3]]);

  const token0 = {
    address: pairData[2].toLowerCase(),
    decimals: tokensData[0][0],
    name: tokensData[0][1],
    symbol: tokensData[0][2],
    price_busd: FixedNumber.from(0, 'ufixed256x18'),
  };

  const token1 = {
    address: pairData[3].toLowerCase(),
    decimals: tokensData[1][0],
    name: tokensData[1][1],
    symbol: tokensData[1][2],
    price_busd: FixedNumber.from(0, 'ufixed256x18'),
  };

  const decimals = pairData[0];

  const totalSupply = FixedNumber.fromValue(
    BigNumber.from(pairData[4]),
    decimals,
    'ufixed256x18'
  );

  const reserve0 = FixedNumber.fromValue(
    BigNumber.from(pairData[1][0]),
    token0.decimals,
    `ufixed256x18`
  );

  const reserve1 = FixedNumber.fromValue(
    BigNumber.from(pairData[1][1]),
    token1.decimals,
    `ufixed256x18`
  );

  const price0 = reserve1.divUnsafe(reserve0);
  const price1 = reserve0.divUnsafe(reserve1);

  const reserve0_perlp = reserve0.divUnsafe(totalSupply);
  const reserve1_perlp = reserve1.divUnsafe(totalSupply);

  token0.price_busd =
    price[token0.address]?.price_busd ??
    price0.mulUnsafe(price[token1.address].price_busd);

  token1.price_busd =
    price[token1.address]?.price_busd ??
    price1.mulUnsafe(price[token0.address].price_busd);

  const price_busd = reserve0_perlp
    .mulUnsafe(token0.price_busd)
    .addUnsafe(reserve1_perlp.mulUnsafe(token1.price_busd));

  const totalLiquidity_busd = totalSupply.mulUnsafe(price_busd);

  return {
    address: pairAddress,
    decimals,
    reserve0,
    reserve1,
    reserve0_perlp,
    reserve1_perlp,
    totalSupply,
    price0,
    price1,
    price_busd,
    totalLiquidity_busd,
    token0,
    token1,
  };
};

const fetchTokensData = (web3: Web3, tokens: string[]) => {
  const batch = new web3.BatchRequest();

  const requests = tokens.map((address) => {
    const ERC20Contract = createContract(web3, ABI_ERC20 as any, address);

    return Promise.all([
      createBatchRequest<string>(batch, ERC20Contract.methods.decimals().call),
      createBatchRequest<string>(batch, ERC20Contract.methods.name().call),
      createBatchRequest<string>(batch, ERC20Contract.methods.symbol().call),
    ]);
  });

  batch.execute();

  return Promise.all(requests);
};

const fetchPairData = (web3: Web3, address: string) => {
  const pancakePairContract = createContract(
    web3,
    ABI_PancakePair as any,
    address
  );

  const batch = new web3.BatchRequest();

  const requests: [
    Promise<string>,
    Promise<[string, string]>,
    Promise<string>,
    Promise<string>,
    Promise<string>
  ] = [
    createBatchRequest<string>(
      batch,
      pancakePairContract.methods.decimals().call
    ),
    createBatchRequest<[string, string]>(
      batch,
      pancakePairContract.methods.getReserves().call
    ),
    createBatchRequest<string>(
      batch,
      pancakePairContract.methods.token0().call
    ),
    createBatchRequest<string>(
      batch,
      pancakePairContract.methods.token1().call
    ),
    createBatchRequest<string>(
      batch,
      pancakePairContract.methods.totalSupply().call
    ),
  ];

  batch.execute();

  return Promise.all(requests);
};
