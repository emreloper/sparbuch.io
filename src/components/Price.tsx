import { Box, HStack, Text } from '@chakra-ui/react';
import { FixedNumber } from '@ethersproject/bignumber';
import React from 'react';
import { useLocalization } from '../context/localization-context';

interface PriceProps {
  price: FixedNumber;
  currency: string;
}

export const Price = ({ price, currency }: PriceProps) => {
  const localization = useLocalization();
  const parts = localization.currencyFormat.formatToParts(
    price.toUnsafeFloat()
  );

  return (
    <HStack>
      <Text>{}</Text>
    </HStack>
  );
};
