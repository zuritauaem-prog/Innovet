
import React from 'react';
import { BarChart, TrendingUp, AlertOctagon, Package, Info, FileCheck } from 'lucide-react';
import { Reporte } from '../types';

interface CalculationsSummaryProps {
  data: Reporte;
}

const CalculationsSummary: React.FC<CalculationsSummaryProps> = ({ data }) => {
  const totalProduction = data.registrosHora.reduce((acc, curr) => acc + curr.produccionReal, 0);
  const totalMeta = data.meta || 0;
  const productivity = totalMeta > 0 ? (totalProduction / totalMeta) * 100 : 0;
  
  const mTermo = data.registrosHora.reduce((acc, curr) => acc + curr.mermaTermo, 0);
  const mSuaje = data.registrosHora.reduce((acc, curr) => acc + curr.mermaSuaje, 0);
  const totalWaste = mTermo + mSuaje;
  
  const totalKgConsumidos = data.materiales.reduce((acc, curr) => acc + curr.pesoKg, 0);
  const wastePercentage = totalKgConsumidos > 0 ? (totalWaste / totalKgConsumidos) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-6 bg-teal-50 border border-teal-100 rounded-3xl">
        <div className="bg-teal-600 p-3 rounded-2xl text-white shadow-lg shadow-teal-500/20">
          <FileCheck size={32} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Validación Final de Reporte</h3>
          <p className="text-slate-600 text-sm">Por favor, revisa los indicadores calculados automáticamente antes de enviar a archivo digital.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Productivity Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <TrendingUp size={18} className="text-teal-600" />
              Productividad
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${productivity >= 90 ? 'bg-green-100 text-green-700' : productivity >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
              {productivity >= 90 ? 'Excelente' : productivity >= 70 ? 'Regular' : 'Bajo'}
            </span>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-slate-900">{productivity.toFixed(1)}%</span>
            <span className="text-slate-400 text-sm mb-2">de meta alcanzada</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Producción: {totalProduction.toLocaleString()} PZ</span>
              <span>Meta: {totalMeta.toLocaleString()} PZ</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(productivity, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Waste Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <AlertOctagon size={18} className="text-red-500" />
              Mermas y Desperdicio
            </span>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-red-600">{totalWaste.toFixed(2)}</span>
            <span className="text-slate-400 text-sm mb-2 font-bold">KG TOTAL</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Merma Termo</p>
              <p className="text-lg font-black text-slate-900">{mTermo.toFixed(2)} kg</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Merma Suaje</p>
              <p className="text-lg font-black text-slate-900">{mSuaje.toFixed(2)} kg</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold">% de Desperdicio Real:</span>
              <span className={`font-black ${wastePercentage > 15 ? 'text-red-600' : 'text-slate-900'}`}>{wastePercentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recap List */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
        <h4 className="flex items-center gap-2 font-bold uppercase tracking-widest text-slate-400 text-sm">
          <Info size={18} />
          Resumen de la Orden
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Orden (OT)</p>
            <p className="font-mono text-xl text-teal-400 font-bold">{data.ot || '---'}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Producto</p>
            <p className="text-lg font-bold">{data.producto || '---'}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Material</p>
            <p className="text-lg font-bold">{totalKgConsumidos.toFixed(1)} KG</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Rollos</p>
            <p className="text-lg font-bold">{data.materiales.length} PZ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsSummary;
