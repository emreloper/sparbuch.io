import { Avatar, AvatarGroup, AvatarGroupProps } from '@chakra-ui/react';
import React from 'react';
import { Token } from '../state/pair';

interface PairAvatarProps extends Omit<AvatarGroupProps, 'children'> {
  tokens: Token[];
}

export const PairAvatar = ({ tokens, ...props }: PairAvatarProps) => {
  return (
    <AvatarGroup {...props}>
      {tokens.map(({ address, symbol }) => (
        <Avatar
          key={address}
          name={symbol}
          src={`https://exchange.pancakeswap.finance/images/coins/${address}.png`}
        />
      ))}
    </AvatarGroup>
  );
};
