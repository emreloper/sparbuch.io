import { BigNumber, FixedNumber } from '@ethersproject/bignumber';
import { selector } from 'recoil';
import { createBatchRequest, createWeb3 } from '../common/web3';
import ABI_PancakePair from '../abis/PancakePair.json';

export enum TRACKED_TOKENS {
  WBNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  BTCB = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  ETH = '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  CAKE = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  BUSD = '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  BUSDT = '0x55d398326f99059ff775485246999027b3197955',
  USDC = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  DAI = '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  VAI = '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
  UST = '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
}

const TRACKED_PAIRS = [
  '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16', // WBNB-BUSD
  '0x7efaef62fddcca950418312c6c91aef321375a00', // BUSDT-BUSD
  '0x2354ef4df11afacb85a5c7f98b624072eccddbb1', // USDC-BUSD
  '0x66fdb2eccfb58cf098eaa419e5efde841368e489', // DAI-BUSD
  '0x133ee93fe93320e1182923e1a640912ede17c90c', // VAI-BUSD
  '0x05faf555522fa3f93959f86b41a3808666093210', // UST-BUSD
  '0x61eb789d75a95caa3ff50ed7e47b96c132fec082', // BTCB-WBNB
  '0x74e4716e431f45807dcf19f284c7aa99f18a4fbc', // ETH-WBNB
  '0x0ed7e52944161450477ee417de9cd3a859b14fd0', // CAKE-WBNB
];

export const priceQuery = selector({
  key: 'price',
  get: async () => {
    const web3 = createWeb3();

    const batch = new web3.BatchRequest();

    const requests = TRACKED_PAIRS.map(async (address) => {
      const pancakePairContract = new web3.eth.Contract(
        ABI_PancakePair as any,
        address
      );

      const reserves = await createBatchRequest<string>(
        batch,
        pancakePairContract.methods.getReserves().call
      );

      const reserve0 = FixedNumber.fromValue(
        BigNumber.from(reserves[0]),
        '18',
        'ufixed256x18'
      );

      const reserve1 = FixedNumber.fromValue(
        BigNumber.from(reserves[1]),
        '18',
        'ufixed256x18'
      );

      return {
        price0: reserve1.divUnsafe(reserve0),
        price1: reserve0.divUnsafe(reserve1),
      };
    });

    batch.execute();

    const [
      wbnb,
      busdt,
      usdc,
      dai,
      vai,
      ust,
      btcb,
      eth,
      cake,
    ] = await Promise.all(requests);

    return {
      [TRACKED_TOKENS.BUSD]: {
        price_busd: FixedNumber.from(1, 'ufixed256x18'),
      },
      [TRACKED_TOKENS.BUSDT]: {
        price_busd: busdt.price0,
      },
      [TRACKED_TOKENS.USDC]: {
        price_busd: usdc.price0,
      },
      [TRACKED_TOKENS.DAI]: {
        price_busd: dai.price0,
      },
      [TRACKED_TOKENS.VAI]: {
        price_busd: vai.price0,
      },
      [TRACKED_TOKENS.UST]: {
        price_busd: ust.price0,
      },
      [TRACKED_TOKENS.WBNB]: {
        price_busd: wbnb.price0,
      },
      [TRACKED_TOKENS.BTCB]: {
        price_busd: btcb.price0.mulUnsafe(wbnb.price0),
      },
      [TRACKED_TOKENS.ETH]: {
        price_busd: eth.price0.mulUnsafe(wbnb.price0),
      },
      [TRACKED_TOKENS.CAKE]: {
        price_busd: cake.price0.mulUnsafe(wbnb.price0),
      },
    };
  },
});
