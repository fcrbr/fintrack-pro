import { createContext, useState, useEffect } from 'react'; // Adicionado useEffect
import type { ReactNode } from 'react';
import type { WalletState, Transaction, WalletContextData } from '../types/finance';


const API_URL = 'http://localhost:3001/transactions';

export const WalletContext = createContext<WalletContextData | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    transactions: [],
    balance: 0,
    userName: "Seu Nome"
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // 2. BUSCAR DADOS (GET)
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Transaction[] = await response.json();
        
        const totalBalance = data.reduce((acc, curr) => 
          curr.type === 'DEPOSIT' ? acc + curr.amount : acc - curr.amount, 0
        );

        setWallet({ transactions: data, balance: totalBalance, userName: "Seu Nome" });
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 3. SALVAR DADOS (POST) - Isso envia para o server.json!
  const addTransaction = async (data: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        // Se o servidor aceitou, atualizamos a tela
        setWallet(prev => ({
          ...prev,
          transactions: [newTransaction, ...prev.transactions],
          balance: data.type === 'DEPOSIT' ? prev.balance + data.amount : prev.balance - data.amount
        }));
      }
    } catch (error) {
      alert("Error saving transaction to server");
    }
  };

  // 4. O Return (OBRIGATÓRIO para o Contexto funcionar)
  return (
    <WalletContext.Provider value={{ wallet, addTransaction, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}