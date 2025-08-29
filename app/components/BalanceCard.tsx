'use client';

import { useState } from 'react';
import type { Balance } from 'wagmi';

interface BalanceCardProps {
  balance: Balance;
  usdPrice?: number;
  showDetails?: boolean;
}

export default function BalanceCard({ balance, usdPrice, showDetails = false }: BalanceCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Format balance with proper decimal precision
  const formatBalance = (value: bigint, decimals: number, maxDecimals: number = 5): string => {
    const formatted = Number(value) / Math.pow(10, decimals);

    if (formatted === 0) return '0';

    if (formatted < 0.0001) {
      return '< 0.0001';
    }

    return formatted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
      useGrouping: true,
    });
  };

  // Get full precision for details view
  const getFullPrecisionBalance = (value: bigint, decimals: number): string => {
    const formatted = Number(value) / Math.pow(10, decimals);
    return formatted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
      useGrouping: true,
    });
  };

  // Calculate USD value
  const calculateUSDValue = (value: bigint, decimals: number, usdPrice: number): string => {
    const cryptoValue = Number(value) / Math.pow(10, decimals);
    const usdValue = cryptoValue * usdPrice;
    return usdValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedBalance = formatBalance(balance.value, balance.decimals);
  const usdValue = usdPrice ? calculateUSDValue(balance.value, balance.decimals, usdPrice) : null;
  const fullPrecisionBalance = getFullPrecisionBalance(balance.value, balance.decimals);

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {balance.symbol?.[0] || '?'}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{balance.symbol}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{balance.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-semibold text-gray-900 dark:text-white">
            {formattedBalance} {balance.symbol}
          </div>
          {usdValue && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ≈ {usdValue}
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {expanded ? 'Hide details' : 'Show full precision'}
          </button>
          {expanded && (
            <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300">
              <div>Full balance: {fullPrecisionBalance} {balance.symbol}</div>
              <div>Raw value: {balance.value.toString()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
