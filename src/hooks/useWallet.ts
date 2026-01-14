import { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

export function useWallet() {
  const context = useContext(WalletContext);
  
  // Se o componente não estiver dentro do Provider, o erro é claro
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
}