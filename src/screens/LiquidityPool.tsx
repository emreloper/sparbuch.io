import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Circle,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AddToMetamaskButton } from '../components/AddToMetamaskButton';
import { AppShell } from '../components/AppShell';
import { PairAvatar } from '../components/PairAvatar';
import { TokenDetail } from '../components/TokenDetail';
import { useLocalization } from '../context/localization-context';
import Binance from '../images/binance.jpg';
import BlockFi from '../images/blockfi.jpg';
import Coinbase from '../images/coinbase.png';
import PancakeSwap from '../images/pancakeswap.png';
import { pairQuery } from '../state/pair';

const LiquidityPool = () => {
  const localization = useLocalization();
  const params = useParams();
  const pair = useRecoilValue(pairQuery(params.address));

  return (
    <AppShell>
      <Breadcrumb mt={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {pair.token0.symbol}-{pair.token1.symbol}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mt={4}>
        <PairAvatar tokens={[pair.token0, pair.token1]} />
        <VStack alignItems="flex-start" spacing={0}>
          <HStack>
            <Heading size="lg" fontWeight="semibold">
              {pair.token0.symbol} - {pair.token1.symbol}
            </Heading>
            <Box>
              <AddToMetamaskButton
                size="xs"
                token={{
                  address: pair.address,
                  decimals: pair.decimals,
                  symbol: `LP-${pair.token0.symbol}-${pair.token1.symbol}`.substring(
                    0,
                    6
                  ),
                }}
              />
            </Box>
          </HStack>
          <Box minW={0}>
            <Link
              href={`https://bscscan.com/token/${pair.address}`}
              isTruncated
            >
              {pair.address} <FontAwesomeIcon icon="external-link-alt" />
            </Link>
          </Box>
        </VStack>
      </HStack>
      <ButtonGroup mt={4} size="sm">
        <Menu isLazy>
          <MenuButton
            as={Button}
            colorScheme="purple"
            rightIcon={<FontAwesomeIcon icon="chevron-down" />}
          >
            Liquidity
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem
                as={Link}
                href={`https://exchange.pancakeswap.finance/#/add/${pair.token0.address}/${pair.token1.address}`}
                target="_blank"
                icon={<FontAwesomeIcon icon="plus" />}
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                Add Liquidity
              </MenuItem>
              <MenuItem
                as={Link}
                href={`https://exchange.pancakeswap.finance/#/remove/${pair.token0.address}/${pair.token1.address}`}
                target="_blank"
                icon={<FontAwesomeIcon icon="minus" />}
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                Remove Liquidity
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        <Menu isLazy>
          <MenuButton
            as={Button}
            colorScheme="purple"
            rightIcon={<FontAwesomeIcon icon="chevron-down" />}
          >
            Swap
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem
                as={Link}
                href={`https://exchange.pancakeswap.finance/#/swap?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`}
                target="_blank"
                icon={
                  <Circle overflow="hidden">
                    <img
                      src={PancakeSwap}
                      alt="PancakeSwap"
                      width={24}
                      height={24}
                    />
                  </Circle>
                }
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                PancakeSwap
              </MenuItem>
              <MenuItem
                as={Link}
                href="https://www.coinbase.com/join/yilmaz_fqh"
                target="_blank"
                icon={
                  <Circle overflow="hidden">
                    <img src={Coinbase} alt="Coinbase" width={24} height={24} />
                  </Circle>
                }
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                Coinbase - Earn $10 in Bitcoin!
              </MenuItem>
              <MenuItem
                as={Link}
                href="https://www.binance.com/en/register?ref=11671369"
                target="_blank"
                icon={
                  <Circle overflow="hidden">
                    <img src={Binance} alt="Binance" width={24} height={24} />
                  </Circle>
                }
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                Binance
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        <Menu isLazy>
          <MenuButton
            as={Button}
            colorScheme="purple"
            rightIcon={<FontAwesomeIcon icon="chevron-down" />}
          >
            Earn
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem
                as={Link}
                href="https://blockfi.com/?ref=9251c9f4"
                target="_blank"
                icon={
                  <Circle overflow="hidden">
                    <img src={BlockFi} alt="BlockFi" width={24} height={24} />
                  </Circle>
                }
                // @ts-ignore
                command={<FontAwesomeIcon icon="external-link-alt" />}
              >
                BlockFi - Earn up to 8.6% APY in crypto
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </ButtonGroup>
      <SimpleGrid columns={[1, 3]} gap={4} mt={6}>
        <Box p={4} bg="white" shadow="base">
          <HStack>
            <VStack spacing={0} alignItems="flex-start">
              <Text as="div" fontSize="xl" fontWeight="semibold">
                LP Price
              </Text>
              <HStack alignItems="baseline" spacing={1}>
                <Text as="div" fontSize="lg">
                  {localization.currencyFormat.format(
                    pair.price_busd.toUnsafeFloat()
                  )}
                </Text>
                <Text as="div" fontSize="xs">
                  BUSD
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Text fontSize="2xl">💵</Text>
          </HStack>
        </Box>
        <Box p={4} bg="white" shadow="base">
          <HStack>
            <VStack spacing={0} alignItems="flex-start">
              <Text as="div" fontSize="xl" fontWeight="semibold">
                Total Liquidity
              </Text>
              <HStack alignItems="baseline" spacing={1}>
                <Text as="div" fontSize="lg">
                  {localization.currencyFormat.format(
                    pair.totalLiquidity_busd.toUnsafeFloat()
                  )}
                </Text>
                <Text as="div" fontSize="xs">
                  BUSD
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Text fontSize="2xl">💰</Text>
          </HStack>
        </Box>
        <Box p={4} bg="white" shadow="base">
          <HStack>
            <VStack spacing={0} alignItems="flex-start">
              <Text as="div" fontSize="xl" fontWeight="semibold">
                Total Supply
              </Text>
              <HStack alignItems="baseline" spacing={1}>
                <Text as="div" fontSize="lg">
                  {localization.currencyFormat.format(
                    pair.totalSupply.toUnsafeFloat()
                  )}
                </Text>
                <Text as="div" fontSize="xs">
                  LP
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Text fontSize="2xl">🏧</Text>
          </HStack>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, 2]} spacing={4} my={6}>
        <TokenDetail pair={pair} tokenKey="token0" />
        <TokenDetail pair={pair} tokenKey="token1" />
      </SimpleGrid>
    </AppShell>
  );
};

export default LiquidityPool;
