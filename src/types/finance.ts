export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description: string;
}

export interface WalletState {
  transactions: Transaction[];
  balance: number;
  userName: string;
}

export interface WalletContextData {
  wallet: WalletState;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  isLoading: boolean;
}