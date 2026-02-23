
import React from 'react';
import { Plus, FileText, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';
import { Reporte } from '../types';

interface DashboardProps {
  reports: Reporte[];
  onCreateNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ reports, onCreateNew }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Panel de Producción</h2>
          <p className="text-slate-500 mt-1">Gestión de reportes diarios Innovet</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
        >
          <Plus size={20} />
          Nuevo Reporte
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-teal-600 mb-2">
            <CheckCircle2 size={24} />
            <span className="font-bold text-sm uppercase tracking-wider">Finalizados</span>
          </div>
          <p className="text-4xl font-black text-slate-900">0</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Últimas 24 horas</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-amber-500 mb-2">
            <Clock size={24} />
            <span className="font-bold text-sm uppercase tracking-wider">En Proceso</span>
          </div>
          <p className="text-4xl font-black text-slate-900">{reports.length}</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Actualmente activos</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-blue-500 mb-2">
            <FileText size={24} />
            <span className="font-bold text-sm uppercase tracking-wider">Total Hoy</span>
          </div>
          <p className="text-4xl font-black text-slate-900">{reports.length}</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Formato PRF-03</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Reportes Recientes</h3>
          <button className="text-teal-600 text-sm font-semibold hover:underline">Ver todo</button>
        </div>
        <div className="overflow-x-auto">
          {reports.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FileText size={32} />
              </div>
              <h4 className="text-slate-900 font-bold text-lg">No hay reportes hoy</h4>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">Comienza creando un nuevo reporte de producción para el turno actual.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">OT</th>
                  <th className="px-6 py-4">Producto</th>
                  <th className="px-6 py-4">Máquina</th>
                  <th className="px-6 py-4">Turno</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-teal-700">{report.ot}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900">{report.producto}</div>
                      <div className="text-xs text-slate-500">{report.fecha}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.maquina}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.turno}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${report.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><FileText size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><ArrowRight size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
