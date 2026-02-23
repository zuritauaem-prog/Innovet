
import React, { useState } from 'react';
import { Layout, Plus, FileText, Settings, BarChart3, LogOut, Search } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProductionForm from './components/ProductionForm';
import { Reporte } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'form'>('dashboard');
  const [reports, setReports] = useState<Reporte[]>([]);

  const handleCreateNew = () => {
    setView('form');
  };

  const handleSaveReport = (newReport: Reporte) => {
    setReports([newReport, ...reports]);
    setView('dashboard');
  };

  const handleCancel = () => {
    setView('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="bg-teal-500 p-2 rounded-lg">
            <Layout size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">INNOVET</h1>
            <p className="text-[10px] uppercase text-teal-400 font-semibold tracking-widest">Thermoforming</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === 'dashboard' ? 'bg-teal-600' : 'hover:bg-slate-800'}`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={handleCreateNew}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === 'form' ? 'bg-teal-600' : 'hover:bg-slate-800'}`}
          >
            <FileText size={20} />
            <span className="font-medium">Nuevo Reporte</span>
          </button>
          <div className="pt-4 mt-4 border-t border-slate-800">
            <p className="text-xs uppercase text-slate-500 font-bold mb-4 px-4 tracking-wider">Configuración</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors">
              <Settings size={20} />
              <span>Plantas</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 text-slate-500">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar por OT o Producto..." 
              className="bg-transparent outline-none text-sm w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Sherlyn Garcia</p>
              <p className="text-xs text-slate-500">Operador Senior</p>
            </div>
            <img 
              src="https://picsum.photos/40/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border border-slate-200"
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {view === 'dashboard' ? (
            <Dashboard 
              reports={reports} 
              onCreateNew={handleCreateNew} 
            />
          ) : (
            <ProductionForm 
              onSave={handleSaveReport} 
              onCancel={handleCancel} 
            />
          )}
        </div>

        {/* System Footer */}
        <footer className="h-10 bg-slate-100 border-t border-slate-200 flex items-center justify-center px-6 shrink-0 text-[10px] text-slate-500 font-medium tracking-tight">
          <span className="mx-2">PRF-03</span>
          <span className="text-slate-300">|</span>
          <span className="mx-2">Efectividad: 01-julio-2022</span>
          <span className="text-slate-300">|</span>
          <span className="mx-2">Rev. #1</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
