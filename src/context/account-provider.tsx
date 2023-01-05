import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createContractClient,
  getAddress,
  getNativeCoinBalance,
  onAccountAvailable,
  snip20Def,
  coinConvert,
  Snip20Contract,
  viewingKeyManager,
} from '@stakeordie/griptape.js';

export interface AccountContextProps {
  address: string;
  nativeBalance: string;
  wrappedBalance: string;
  isConnected: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  viewingKey: string;
  createViewingKey: () => Promise<void>;
  deposit: (amount: number) => Promise<void>;
  redeem: (amount: number) => Promise<void>;
}

const AccountContext = createContext<AccountContextProps | null>(null);

export function AccountProvider({ children = null as any }) {
  const [address, setAddress] = useState('');
  const [nativeBalance, setNativeBalance] = useState('');
  const [wrappedBalance, setWrappedBalance] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [viewingKey, setViewingKey] = useState('');

  const sscrt = createContractClient<Snip20Contract>({
    id: 'sscrt',
    at: 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
    definition: snip20Def,
  });

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setConnected(true);
      fetch();
    });

    return () => removeOnAccountAvailable();
  }, []);

  useEffect(() => {
    const fetching = setInterval(() => {
      if (isConnected) {
        fetch();
      }
    }, 5000);

    return () => clearInterval(fetching);
  }, [isConnected]);

  async function fetch() {
    setLoading(true);

    setAddress(getAddress() || '');

    try {
      let nativeBalance = await getNativeCoinBalance();
      nativeBalance = coinConvert(nativeBalance, 6, 'human');
      setNativeBalance(nativeBalance);

      const {
        balance: { amount: result },
      } = await sscrt.getBalance();
      const wrappedBalance = coinConvert(result, 6, 'human');
      setWrappedBalance(wrappedBalance);

      const viewingKey = viewingKeyManager.get(sscrt.at);
      setViewingKey(viewingKey || '');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const createViewingKey = async () => {
    setProcessing(true);
    try {
      const res = await sscrt.createViewingKey();
      if (res.isEmpty()) return;
      const {
        create_viewing_key: { key },
      } = res.parse();
      viewingKeyManager.add(sscrt, key);
    } catch (e) {
      console.log(e);
    } finally {
      setProcessing(false);
    }
  };

  const deposit = async (amount: number) => {
    setProcessing(true);
    try {
      const theAmount = coinConvert(amount, 6, 'machine');
      await sscrt.deposit(theAmount);
    } catch (e) {
      console.log(e);
    } finally {
      setProcessing(false);
    }
  };

  const redeem = async (amount: number) => {
    setProcessing(true);
    try {
      const theAmount = coinConvert(amount, 6, 'machine');
      await sscrt.redeem(theAmount);
    } catch (e) {
      console.log(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        nativeBalance,
        wrappedBalance,
        isConnected,
        isProcessing,
        isLoading,
        viewingKey,
        createViewingKey,
        deposit,
        redeem,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error('context undefined');
  }

  return context;
}
