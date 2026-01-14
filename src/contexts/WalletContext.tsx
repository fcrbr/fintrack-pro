import { createContext, useState, ReactNode } from 'react';
import { WalletState, Transaction, WalletContextData } from '../types/finance';

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

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