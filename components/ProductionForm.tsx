
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, AlertTriangle, Calculator, UserCheck } from 'lucide-react';
import { Step, Reporte, RegistroHora, RegistroMaterial } from '../types';
import Step1Header from './Step1Header';
import Step2HourlyLogs from './Step2HourlyLogs';
import Step3Materials from './Step3Materials';
import CalculationsSummary from './CalculationsSummary';

interface ProductionFormProps {
  onSave: (report: Reporte) => void;
  onCancel: () => void;
}

const ProductionForm: React.FC<ProductionFormProps> = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Header);
  const [formData, setFormData] = useState<Partial<Reporte>>({
    id: Math.random().toString(36).substr(2, 9),
    fecha: new Date().toLocaleDateString(),
    registrosHora: [],
    materiales: [],
    status: 'Draft',
    meta: 10000, // Default meta
  });

  const nextStep = () => {
    if (currentStep < Step.Summary) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > Step.Header) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData: Partial<Reporte>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleFinalSave = () => {
    onSave({
      ...formData as Reporte,
      status: 'Completed'
    });
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in slide-in-from-bottom-4 duration-500">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {currentStep === Step.Header && "1. Datos Generales de Producción"}
            {currentStep === Step.HourlyLogs && "2. Control de Producción por Hora"}
            {currentStep === Step.Materials && "3. Inocuidad y Registro de Materiales"}
            {currentStep === Step.Summary && "4. Resumen y Firma de Reporte"}
          </h2>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Paso {currentStep} de 4
          </div>
        </div>
        
        {/* Step Indicator Bar */}
        <div className="flex gap-2 h-2 mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`flex-1 rounded-full transition-all duration-300 ${
                currentStep >= step ? 'bg-teal-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Form Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[500px] flex flex-col">
        <div className="p-8 flex-1">
          {currentStep === Step.Header && (
            <Step1Header 
              data={formData} 
              onUpdate={updateFormData} 
            />
          )}
          {currentStep === Step.HourlyLogs && (
            <Step2HourlyLogs 
              logs={formData.registrosHora || []} 
              onUpdate={(logs) => updateFormData({ registrosHora: logs })}
              metaGlobal={formData.meta || 0}
            />
          )}
          {currentStep === Step.Materials && (
            <Step3Materials 
              materiales={formData.materiales || []} 
              onUpdate={(mats) => updateFormData({ materiales: mats })}
            />
          )}
          {currentStep === Step.Summary && (
            <CalculationsSummary 
              data={formData as Reporte} 
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button 
            onClick={currentStep === Step.Header ? onCancel : prevStep}
            className="flex items-center gap-2 px-6 py-2.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft size={20} />
            {currentStep === Step.Header ? 'Cancelar' : 'Anterior'}
          </button>
          
          <div className="flex items-center gap-4">
             {currentStep === Step.Summary ? (
                <button 
                  onClick={handleFinalSave}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-500/30"
                >
                  <Save size={20} />
                  Finalizar Reporte PRF-03
                </button>
             ) : (
                <button 
                  onClick={nextStep}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
             )}
          </div>
        </div>
      </div>

      {/* Real-time Calculation Floating Bar (Visible in Step 2 & 3) */}
      {(currentStep === Step.HourlyLogs || currentStep === Step.Materials) && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl px-6 py-3 rounded-full flex items-center gap-8 text-sm font-bold z-50">
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Prod. Total</span>
             <span className="text-slate-900">{(formData.registrosHora || []).reduce((acc, curr) => acc + curr.produccionReal, 0).toLocaleString()} pz</span>
           </div>
           <div className="w-px h-8 bg-slate-200" />
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Merma Total</span>
             <span className="text-red-500">{(formData.registrosHora || []).reduce((acc, curr) => acc + curr.mermaTermo + curr.mermaSuaje, 0).toFixed(2)} kg</span>
           </div>
           <div className="w-px h-8 bg-slate-200" />
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Eficiencia</span>
             <span className="text-teal-600">
               {formData.meta && formData.meta > 0 
                ? (((formData.registrosHora || []).reduce((acc, curr) => acc + curr.produccionReal, 0) / formData.meta) * 100).toFixed(1)
                : '0'}%
             </span>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductionForm;
