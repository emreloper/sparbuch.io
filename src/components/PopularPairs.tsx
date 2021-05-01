import {
  Divider,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PairAvatar } from './PairAvatar';

const POPULAR_PAIRS = [
  {
    address: '0x0ed7e52944161450477ee417de9cd3a859b14fd0',
    token0: {
      address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      symbol: 'Cake',
    },
    token1: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
  },
  {
    address: '0x74e4716e431f45807dcf19f284c7aa99f18a4fbc',
    token0: {
      address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      symbol: 'ETH',
    },
    token1: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
  },
  {
    address: '0x61eb789d75a95caa3ff50ed7e47b96c132fec082',
    token0: {
      address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      symbol: 'BTCB',
    },
    token1: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
  },
  {
    address: '0x5afef8567414f29f0f927a0f2787b188624c10e2',
    token0: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
    token1: {
      address: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      symbol: 'BUNNY',
    },
  },
  {
    address: '0x014608e87af97a054c9a49f81e1473076d51d9a3',
    token0: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
    token1: {
      address: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
      symbol: 'UNI',
    },
  },
  {
    address: '0xdd5bad8f8b360d76d12fda230f8baf42fe0022cf',
    token0: {
      address: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
      symbol: 'DOT',
    },
    token1: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
  },
  {
    address: '0x824eb9fadfb377394430d2744fa7c42916de3ece',
    token0: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
    token1: {
      address: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
      symbol: 'LINK',
    },
  },
  {
    address: '0x28415ff2c35b65b9e5c7de82126b4015ab9d031f',
    token0: {
      address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
      symbol: 'ADA',
    },
    token1: {
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'WBNB',
    },
  },
];

export const PopularPairs = () => {
  return (
    <VStack alignItems="stretch">
      {POPULAR_PAIRS.map((pair, index) => (
        <React.Fragment key={pair.address}>
          <HStack as={LinkBox}>
            <PairAvatar tokens={[pair.token0, pair.token1]} size="sm" />
            <LinkOverlay as={RouterLink} to={`/lp/${pair.address}/`}>
              {pair.token0.symbol} - {pair.token1.symbol}
            </LinkOverlay>
            <Spacer />
            <FontAwesomeIcon icon="chevron-right" />
          </HStack>
          {POPULAR_PAIRS.length - 1 > index && <Divider />}
        </React.Fragment>
      ))}
    </VStack>
  );
};
