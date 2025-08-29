'use client';

import type { ReactElement } from 'react';
import { Swap } from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';

const BASE_CHAIN_ID = 8453;

const ETH_NATIVE: Token = {
  address: '',
  chainId: BASE_CHAIN_ID,
  decimals: 18,
  image: null,
  name: 'Ethereum',
  symbol: 'ETH',
};

const USDC_BASE: Token = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chainId: BASE_CHAIN_ID,
  decimals: 6,
  image: null,
  name: 'USDC',
  symbol: 'USDC',
};

export default function SwapPanel(): ReactElement {
  return (
    <div className="max-w-xl">
      <Swap
        from={[ETH_NATIVE]}
        to={[USDC_BASE]}
        config={{ maxSlippage: 1 }}
        experimental={{ useAggregator: true }}
        title="Swap"
      />
    </div>
  );
}


