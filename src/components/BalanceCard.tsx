import { useWallet } from '../hooks/useWallet';

export function BalanceCard() {
  const { wallet } = useWallet();

  // Função simples para formatar a moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
        Total Balance
      </h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">
          {formatCurrency(wallet.balance)}
        </span>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          <p className="text-emerald-500 text-xs font-bold uppercase">Incomes</p>
          <p className="text-white font-semibold">
            {/* Por enquanto fixo, depois calcularemos o total de entradas */}
            {wallet.balance > 0 ? formatCurrency(wallet.balance) : '$0.00'}
          </p>
        </div>
        <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
          <p className="text-rose-500 text-xs font-bold uppercase">Expenses</p>
          <p className="text-white font-semibold">$0.00</p>
        </div>
      </div>
    </div>
  );
}