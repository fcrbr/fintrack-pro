import { useWallet } from '../hooks/useWallet';

export function TransactionList() {
  const { wallet, isLoading } = useWallet();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 bg-slate-900 rounded-xl border border-slate-800"></div>
        ))}
      </div>
    );
  }

  if (wallet.transactions.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl">
        <p className="text-slate-500">No transactions recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {wallet.transactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center gap-4">
            {/* Ícone Minimalista */}
            <div className={`p-2 rounded-lg ${transaction.type === 'DEPOSIT' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {transaction.type === 'DEPOSIT' ? '↓' : '↑'}
            </div>
            
            <div>
              <p className="text-white font-medium">{transaction.description}</p>
              <p className="text-slate-500 text-xs">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className={`font-bold ${transaction.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {transaction.type === 'DEPOSIT' ? '+' : '-'} 
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}