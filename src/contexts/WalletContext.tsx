// src/contexts/WalletContext.tsx

import { createContext, useState } from 'react'; // Código (Runtime)
import type { ReactNode } from 'react'; // Tipo (Design time)
import type { WalletState, Transaction, WalletContextData } from '../types/finance';

export const WalletContext = createContext<WalletContextData | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    transactions: [],
    balance: 0,
    userName: "Seu Nome"
  });
  const [isLoading, setIsLoading] = useState(false);

  const addTransaction = (data: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setWallet(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      balance: data.type === 'DEPOSIT' 
        ? prev.balance + data.amount 
        : prev.balance - data.amount
    }));
  };

  return (
    <WalletContext.Provider value={{ wallet, addTransaction, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}