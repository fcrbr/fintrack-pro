import { createContext, useState, useEffect } from 'react'; // Adicionado useEffect
import type { ReactNode } from 'react';
import type { WalletState, Transaction, WalletContextData } from '../types/finance';

// 1. Simulação de API (fora da função Provider)
const fetchInitialData = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          amount: 1500,
          type: 'DEPOSIT',
          category: 'Salary',
          date: new Date().toISOString(),
          description: 'Initial Deposit (Mock)',
        }
      ]);
    }, 1500);
  });
};

export const WalletContext = createContext<WalletContextData | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    transactions: [],
    balance: 0,
    userName: "Seu Nome"
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // 2. Carregamento inicial (O coração do Item 2)
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInitialData();
        const totalBalance = data.reduce((acc, curr) => 
          curr.type === 'DEPOSIT' ? acc + curr.amount : acc - curr.amount, 0
        );

        setWallet({
          transactions: data,
          balance: totalBalance,
          userName: "Seu Nome"
        });
      } catch (error) {
        console.error("Failed to load financial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 3. Função de adicionar (Mantida)
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

  // 4. O Return (OBRIGATÓRIO para o Contexto funcionar)
  return (
    <WalletContext.Provider value={{ wallet, addTransaction, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}