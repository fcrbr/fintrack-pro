import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

export function TransactionForm() {
  const { addTransaction } = useWallet();
  
  // Estados locais para o formulário
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'DEPOSIT' | 'WITHDRAWAL'>('DEPOSIT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount) return;

    addTransaction({
      description,
      amount: Number(amount),
      type,
      category: 'General', // Poderia ser um select depois
    });

    // Limpar campos
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <h3 className="text-white font-semibold mb-4 text-lg">New Transaction</h3>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Description (ex: Salary)"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Amount"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('DEPOSIT')}
            className={`flex-1 p-2 rounded-lg font-bold transition-all ${type === 'DEPOSIT' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('WITHDRAWAL')}
            className={`flex-1 p-2 rounded-lg font-bold transition-all ${type === 'WITHDRAWAL' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Expense
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg mt-2 transition-colors"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}