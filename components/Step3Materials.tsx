
import React from 'react';
import { Plus, Trash2, ShieldCheck, User } from 'lucide-react';
import { RegistroMaterial } from '../types';

interface Step3MaterialsProps {
  materiales: RegistroMaterial[];
  onUpdate: (mats: RegistroMaterial[]) => void;
}

const Step3Materials: React.FC<Step3MaterialsProps> = ({ materiales, onUpdate }) => {
  const addRoll = () => {
    const newRoll: RegistroMaterial = {
      id: Math.random().toString(36).substr(2, 9),
      tipoAjuste: 'Producción',
      lote: '',
      numeroRollo: '',
      pesoKg: 0
    };
    onUpdate([...materiales, newRoll]);
  };

  const updateRoll = (id: string, field: keyof RegistroMaterial, value: any) => {
    onUpdate(materiales.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <div className="space-y-8">
      {/* Materials Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><ShieldCheck size={20} /></div>
            <h3 className="text-lg font-bold text-slate-900">Consumo de Rollos</h3>
          </div>
          <button 
            onClick={addRoll}
            className="text-sm font-bold text-teal-600 hover:text-teal-700 underline flex items-center gap-1"
          >
            <Plus size={16} />
            Agregar Rollo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {materiales.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
              No hay rollos registrados para este turno.
            </div>
          ) : (
            materiales.map((roll, idx) => (
              <div key={roll.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[120px] space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                  <select 
                    value={roll.tipoAjuste}
                    onChange={(e) => updateRoll(roll.id, 'tipoAjuste', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
                  >
                    <option>Producción</option>
                    <option>Ajuste</option>
                    <option>Cambio Molde</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[120px] space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lote</label>
                  <input 
                    type="text" 
                    value={roll.lote}
                    onChange={(e) => updateRoll(roll.id, 'lote', e.target.value)}
                    placeholder="L-0000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                  />
                </div>
                <div className="flex-1 min-w-[120px] space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase"># Rollo</label>
                  <input 
                    type="text" 
                    value={roll.numeroRollo}
                    onChange={(e) => updateRoll(roll.id, 'numeroRollo', e.target.value)}
                    placeholder="ROLL-00"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
                <div className="flex-1 min-w-[100px] space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Peso (kg)</label>
                  <input 
                    type="number" 
                    value={roll.pesoKg}
                    onChange={(e) => updateRoll(roll.id, 'pesoKg', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-blue-700"
                  />
                </div>
                <button 
                  onClick={() => onUpdate(materiales.filter(m => m.id !== roll.id))}
                  className="p-2 text-slate-300 hover:text-red-500 mb-0.5"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Innocuity Checklist */}
      <section className="bg-teal-50/50 p-6 rounded-3xl border border-teal-100 space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold uppercase text-sm tracking-widest">
          <ShieldCheck size={20} />
          Checklist Inocuidad & Seguridad
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 bg-white border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-700 font-medium">Área limpia y despejada</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-700 font-medium">EPP Completo utilizado</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-700 font-medium">Herramental sanitizado</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-700 font-medium">Ausencia de objetos extraños</span>
          </label>
        </div>
      </section>

      {/* Signatures simulation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Firma Digital Operador</label>
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 bg-slate-50 group cursor-pointer hover:border-teal-400 transition-all">
            <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform">
              <User size={24} />
              <span className="text-xs">Firmar como Operador</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Firma Digital Calidad</label>
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 bg-slate-50 group cursor-pointer hover:border-teal-400 transition-all">
            <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform">
              <User size={24} />
              <span className="text-xs">Firmar como Calidad</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step3Materials;
