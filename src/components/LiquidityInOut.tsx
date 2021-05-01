import React from 'react';
import { createWeb3 } from '../common/web3';
import ABI_PancakePair from '../abis/PancakePair.json';

interface LiquidityInOutProps {
  address: string;
}

export const LiquidityInOut = ({ address }: LiquidityInOutProps) => {
  React.useEffect(() => {
    const web3 = createWeb3();

    const contract = new web3.eth.Contract(ABI_PancakePair as any, address);
  }, []);

  return <div></div>;
};
