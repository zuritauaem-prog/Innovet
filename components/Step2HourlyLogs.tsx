
import React from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { RegistroHora } from '../types';

interface Step2HourlyLogsProps {
  logs: RegistroHora[];
  onUpdate: (logs: RegistroHora[]) => void;
  metaGlobal: number;
}

const Step2HourlyLogs: React.FC<Step2HourlyLogsProps> = ({ logs, onUpdate, metaGlobal }) => {
  const addRow = () => {
    const newLog: RegistroHora = {
      id: Math.random().toString(36).substr(2, 9),
      hora: `${new Date().getHours()}:00`,
      metaHora: Math.floor(metaGlobal / 8), // Assuming 8h shift
      produccionReal: 0,
      mermaTermo: 0,
      mermaSuaje: 0,
      observaciones: ''
    };
    onUpdate([...logs, newLog]);
  };

  const updateRow = (id: string, field: keyof RegistroHora, value: any) => {
    const newLogs = logs.map(log => 
      log.id === id ? { ...log, [field]: value } : log
    );
    onUpdate(newLogs);
  };

  const removeRow = (id: string) => {
    onUpdate(logs.filter(log => log.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Registros de Productividad</h3>
          <p className="text-sm text-slate-500">Documenta la producción real por cada hora laborada.</p>
        </div>
        <button 
          onClick={addRow}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all border border-slate-200"
        >
          <Plus size={18} />
          Agregar Hora
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
              <th className="px-4 py-3 text-left w-24">Hora</th>
              <th className="px-4 py-3 text-left w-32">Meta Hora</th>
              <th className="px-4 py-3 text-left w-32">Producción</th>
              <th className="px-4 py-3 text-left w-32">M. Termo (kg)</th>
              <th className="px-4 py-3 text-left w-32">M. Suaje (kg)</th>
              <th className="px-4 py-3 text-left">Observaciones</th>
              <th className="px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                  No hay registros aún. Presiona "Agregar Hora" para comenzar.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-3 py-2">
                    <input 
                      type="text"
                      value={log.hora}
                      onChange={(e) => updateRow(log.id, 'hora', e.target.value)}
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm font-bold bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input 
                      type="number"
                      value={log.metaHora}
                      onChange={(e) => updateRow(log.id, 'metaHora', parseInt(e.target.value))}
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input 
                      type="number"
                      value={log.produccionReal}
                      onChange={(e) => updateRow(log.id, 'produccionReal', parseInt(e.target.value))}
                      className={`w-full px-2 py-2 border rounded-lg text-sm font-bold bg-transparent ${log.produccionReal < log.metaHora ? 'border-red-200 text-red-600 bg-red-50/30' : 'border-teal-200 text-teal-600'}`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input 
                      type="number"
                      step="0.1"
                      value={log.mermaTermo}
                      onChange={(e) => updateRow(log.id, 'mermaTermo', parseFloat(e.target.value))}
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input 
                      type="number"
                      step="0.1"
                      value={log.mermaSuaje}
                      onChange={(e) => updateRow(log.id, 'mermaSuaje', parseFloat(e.target.value))}
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input 
                      type="text"
                      value={log.observaciones}
                      onChange={(e) => updateRow(log.id, 'observaciones', e.target.value)}
                      placeholder="Motivos de paro, etc..."
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button 
                      onClick={() => removeRow(log.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-bold text-blue-900">Indicador Visual de Eficiencia</p>
          <p className="text-xs text-blue-700">Las celdas de producción se marcarán en <span className="text-red-600 font-bold">rojo</span> si la producción está por debajo de la meta horaria establecida.</p>
        </div>
      </div>
    </div>
  );
};

export default Step2HourlyLogs;
