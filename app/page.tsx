'use client';

import { useState } from 'react';
import SwapPanel from './components/SwapPanel';
import BalanceCard from './components/BalanceCard';
import { useAccount, useBalance } from 'wagmi';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'swap' | 'earn'>('dashboard');
  const { isConnected } = useAccount();

  const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`;

  const { address } = useAccount();

  // Mock USD prices - in production, these would come from an API
  const MOCK_PRICES = {
    ETH: 2814.56,
    USDC: 1.00,
  };

  const { data: ethBalance } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });

  const { data: usdcBalance } = useBalance({
    address,
    token: USDC_BASE_ADDRESS,
    query: { enabled: Boolean(address) },
  });

  const TabButton = (
    props: {
      label: string;
      isActive?: boolean;
      disabled?: boolean;
      onClick?: () => void;
    }
  ) => {
    const { label, isActive, disabled, onClick } = props;
    return (
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={[
          'px-4 py-2 text-sm rounded-md transition-colors',
          isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700',
        ].join(' ')}
      >
        {label}
      </button>
    );
  };
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <header className="pt-4">
        <div className="max-w-4xl mx-auto w-full px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">ccarella @ ETH Jaguar</h1>
            <div className="wallet-container">
              <Wallet>
                <ConnectWallet>
                  <Avatar className="h-6 w-6" />
                  <Name />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownLink
                    icon="wallet"
                    href="https://keys.coinbase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wallet
                  </WalletDropdownLink>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto w-full p-4">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <TabButton
              label="Dashboard"
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <TabButton label="Swap" isActive={activeTab === 'swap'} onClick={() => setActiveTab('swap')} />
            <TabButton label="Earn" disabled onClick={() => setActiveTab('earn')} />
          </div>

          {activeTab === 'dashboard' && (
            <section className="space-y-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                {isConnected ? (
                  <div className="space-y-4">
                    <Identity hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Balances</h2>
                      <div className="space-y-3">
                        {ethBalance && ethBalance.value > BigInt(0) && (
                          <BalanceCard
                            balance={ethBalance}
                            usdPrice={MOCK_PRICES.ETH}
                            showDetails={true}
                          />
                        )}
                        {usdcBalance && usdcBalance.value > BigInt(0) && (
                          <BalanceCard
                            balance={usdcBalance}
                            usdPrice={MOCK_PRICES.USDC}
                            showDetails={true}
                          />
                        )}
                        {!ethBalance && !usdcBalance && (
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Fetching balances…</p>
                          </div>
                        )}
                        {ethBalance && usdcBalance && ethBalance.value === BigInt(0) && usdcBalance.value === BigInt(0) && (
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">No ETH or USDC found.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Connect your wallet using the button in the header to view identity details.
                  </p>
                )}
              </div>
            </section>
          )}
          {activeTab === 'swap' && (
            <section className="space-y-4">
              <h1 className="text-xl font-semibold">Swap</h1>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                {isConnected ? (
                  <SwapPanel />
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Connect your wallet using the button in the header to access the swap.
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
