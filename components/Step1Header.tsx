
import React from 'react';
import { Reporte } from '../types';

interface Step1HeaderProps {
  data: Partial<Reporte>;
  onUpdate: (data: Partial<Reporte>) => void;
}

const Step1Header: React.FC<Step1HeaderProps> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: name === 'meta' ? parseInt(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Orden de Trabajo (OT)</label>
        <input 
          type="text" 
          name="ot"
          value={data.ot || ''}
          onChange={handleChange}
          placeholder="Ej: OT-2024-001"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Máquina / Línea</label>
        <select 
          name="maquina"
          value={data.maquina || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all bg-white"
        >
          <option value="">Seleccionar máquina...</option>
          <option value="Línea 01">Línea 01 - T1</option>
          <option value="Línea 02">Línea 02 - T2</option>
          <option value="Línea 03">Línea 03 - Kiefel</option>
          <option value="Línea 04">Línea 04 - GN</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Producto</label>
        <input 
          type="text" 
          name="producto"
          value={data.producto || ''}
          onChange={handleChange}
          placeholder="Ej: Charola 12x12 PET"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Meta del Turno (PZ)</label>
        <input 
          type="number" 
          name="meta"
          value={data.meta || ''}
          onChange={handleChange}
          placeholder="Ej: 25000"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-teal-700"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Turno</label>
        <div className="grid grid-cols-3 gap-2">
          {['1ero', '2do', '3ero'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onUpdate({ turno: t })}
              className={`py-3 rounded-xl border font-bold transition-all ${
                data.turno === t 
                  ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fecha de Operación</label>
        <input 
          type="text" 
          disabled
          value={data.fecha || ''}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 outline-none cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Operador Responsable</label>
        <input 
          type="text" 
          name="operador"
          value={data.operador || ''}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Coordinador / Auditor</label>
        <input 
          type="text" 
          name="coordinador"
          value={data.coordinador || ''}
          onChange={handleChange}
          placeholder="Nombre de quien valida"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default Step1Header;
