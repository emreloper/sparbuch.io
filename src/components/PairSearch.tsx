import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  FormControl,
  Heading,
  Input,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createContract, createWeb3 } from '../common/web3';
import ABI_PancakeFactory from '../abis/PancakeFactory.json';
import { TRACKED_TOKENS } from '../state/price';
import { TokenSelect } from './TokenSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PairSearchFormData {
  token0: string;
  token1: string;
}

export const PairSearch = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm<PairSearchFormData>();

  const {
    isOpen: isLoading,
    onOpen: startLoading,
    onClose: stopLoading,
  } = useDisclosure();

  const [error, setError] = React.useState<Error | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    startLoading();

    const web3 = createWeb3();
    const pancakeFactoryContract = createContract(
      web3,
      ABI_PancakeFactory as any,
      '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
    );

    try {
      const address = await pancakeFactoryContract.methods
        .getPair(data.token0, data.token1)
        .call();

      navigate(`/lp/${address}/`);
    } catch (e) {
      stopLoading();
      setError(e);
    }
  });

  return (
    <>
      {error !== null && (
        <Alert status="error" mb={6}>
          <AlertDescription>{error.message}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => {
              setError(null);
            }}
          />
        </Alert>
      )}
      <VStack as="form" onSubmit={onSubmit}>
        <Heading alignSelf="flex-start" size="lg" mb={4}>
          Find a 🥞 pair (v2)
        </Heading>
        <FormControl>
          <Input
            placeholder="Token address"
            {...register('token0', { required: true })}
          />
        </FormControl>
        <FormControl display="flex" justifyContent="center">
          <FontAwesomeIcon icon="plus" />
        </FormControl>
        <FormControl>
          <React.Suspense fallback={<Button isLoading>...</Button>}>
            <Controller
              name="token1"
              control={control}
              defaultValue={TRACKED_TOKENS.WBNB}
              render={({ field }) => <TokenSelect {...field} />}
            />
          </React.Suspense>
        </FormControl>
        <FormControl display="flex">
          <Spacer />
          <Button type="submit" colorScheme="purple" isLoading={isLoading}>
            Find LP
          </Button>
        </FormControl>
      </VStack>
    </>
  );
};
