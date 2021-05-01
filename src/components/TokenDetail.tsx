import {
  Avatar,
  Box,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocalization } from '../context/localization-context';
import { Pair } from '../state/pair';
import { AddToMetamaskButton } from './AddToMetamaskButton';

interface TokenDetailProps {
  pair: Pair;
  tokenKey: 'token0' | 'token1';
}

export const TokenDetail = ({ pair, tokenKey }: TokenDetailProps) => {
  const localization = useLocalization();
  const token = pair[tokenKey];
  const pairToken = pair[tokenKey === 'token0' ? 'token1' : 'token0'];
  const price = pair[tokenKey === 'token0' ? 'price0' : 'price1'];
  const reserve = pair[tokenKey === 'token0' ? 'reserve0' : 'reserve1'];
  const reserve_perlp =
    pair[tokenKey === 'token0' ? 'reserve0_perlp' : 'reserve1_perlp'];

  return (
    <Box p={4} bg="white" shadow="base">
      <SimpleGrid columns={3} gap={2}>
        <GridItem colSpan={3}>
          <HStack>
            <Avatar
              size="sm"
              name={token.symbol}
              src={`https://exchange.pancakeswap.finance/images/coins/${token.address}.png`}
            />
            <Text as="div" fontSize="lg" fontWeight="semibold">
              {token.symbol}
            </Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text as="div" fontWeight="semibold">
            Address
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems="baseline">
            <Box isTruncated>
              <Link href={`${token.address}`}>{token.address}</Link>
            </Box>
            <Box>
              <AddToMetamaskButton
                size="xs"
                token={{
                  address: token.address,
                  decimals: token.decimals,
                  symbol: token.symbol.substring(0, 6),
                }}
              />
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <Text as="div" fontWeight="semibold">
            Price
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems="baseline" spacing={1}>
            <Text as="div">
              {localization.currencyFormat.format(
                token.price_busd.toUnsafeFloat()
              )}
            </Text>
            <Text as="div" fontSize="xs">
              BUSD
            </Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text as="div" fontWeight="semibold">
            Price ({pairToken.symbol})
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems="baseline" spacing={1}>
            <Text as="div">
              {localization.currencyFormat.format(price.toUnsafeFloat())}
            </Text>
            <Text as="div" fontSize="xs">
              {pairToken.symbol}
            </Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text as="div" fontWeight="semibold">
            Supply per LP
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems="baseline" spacing={1}>
            <Text as="div">
              {localization.currencyFormat.format(
                reserve_perlp.toUnsafeFloat()
              )}
            </Text>
            <Text as="div" fontSize="xs">
              {token.symbol}
            </Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text as="div" fontWeight="semibold">
            Total Supply
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems="baseline" spacing={1}>
            <Text as="div">
              {localization.currencyFormat.format(reserve.toUnsafeFloat())}
            </Text>
            <Text as="div" fontSize="xs">
              {token.symbol}
            </Text>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
