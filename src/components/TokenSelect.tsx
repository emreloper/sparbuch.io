import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { priceQuery, TRACKED_TOKENS } from '../state/price';

const TOKENS = [
  {
    address: TRACKED_TOKENS.WBNB,
    symbol: 'WBNB',
  },
  {
    address: TRACKED_TOKENS.BTCB,
    symbol: 'BTCB',
  },
  {
    address: TRACKED_TOKENS.ETH,
    symbol: 'ETH',
  },
  {
    address: TRACKED_TOKENS.CAKE,
    symbol: 'Cake',
  },
  {
    address: TRACKED_TOKENS.BUSD,
    symbol: 'BUSD',
  },
  {
    address: TRACKED_TOKENS.BUSDT,
    symbol: 'BUSDT',
  },
  {
    address: TRACKED_TOKENS.USDC,
    symbol: 'USDC',
  },
  {
    address: TRACKED_TOKENS.DAI,
    symbol: 'DAI',
  },
  {
    address: TRACKED_TOKENS.VAI,
    symbol: 'VAI',
  },
  {
    address: TRACKED_TOKENS.UST,
    symbol: 'UST',
  },
];

export const TokenSelect = ({ value, onChange }: ControllerRenderProps) => {
  const price = useRecoilValue(priceQuery);
  const selected = TOKENS.find(({ address }) => address === value);

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        leftIcon={
          <Avatar
            name={selected?.symbol}
            src={`https://exchange.pancakeswap.finance/images/coins/${selected?.address}.png`}
            size="xs"
          />
        }
        rightIcon={<FontAwesomeIcon icon="chevron-down" />}
        w="full"
        textAlign="left"
      >
        {selected?.symbol}
      </MenuButton>
      <Portal>
        <MenuList>
          {TOKENS.map(({ address, symbol }) => (
            <MenuItem
              key={address}
              command={price[address].price_busd
                .toUnsafeFloat()
                .toLocaleString()}
              icon={
                <Avatar
                  name={symbol}
                  src={`https://exchange.pancakeswap.finance/images/coins/${address}.png`}
                  size="xs"
                />
              }
              onClick={() => {
                onChange(address);
              }}
            >
              {symbol}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};
