import { WalletProvider } from './contexts/WalletContext';
import { BalanceCard } from './components/BalanceCard';
import { TransactionForm } from './components/TransactionForm';

function App() {
  return (
    // O Provider precisa envolver tudo para que os componentes acessem os dados
    <WalletProvider>
      <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
        
        {/* Header Profissional */}
        <header className="max-w-4xl mx-auto mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-emerald-400 tracking-tight">
            FinTrack <span className="text-white">Pro</span>
          </h1>
          <p className="text-slate-400 mt-1">Enterprise Asset Management Dashboard</p>
        </header>

        {/* Layout em Grid: Esquerda (Formulário), Direita (Saldo) */}
        <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">New Operation</h2>
            <TransactionForm />
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">Account Summary</h2>
            <BalanceCard />
            
            {/* DICA: No futuro, colocaremos a lista de transações aqui embaixo */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
              Transaction history will appear here.
            </div>
          </section>

        </main>
      </div>
    </WalletProvider>
  );
}

export default App;