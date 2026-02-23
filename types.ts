
export interface RegistroHora {
  id: string;
  hora: string;
  metaHora: number;
  produccionReal: number;
  mermaTermo: number;
  mermaSuaje: number;
  observaciones: string;
}

export interface RegistroMaterial {
  id: string;
  tipoAjuste: string;
  lote: string;
  numeroRollo: string;
  pesoKg: number;
}

export interface Reporte {
  id: string;
  fecha: string;
  ot: string;
  maquina: string;
  producto: string;
  meta: number;
  turno: string;
  operador: string;
  coordinador: string;
  registrosHora: RegistroHora[];
  materiales: RegistroMaterial[];
  status: 'Draft' | 'Completed';
}

export enum Step {
  Header = 1,
  HourlyLogs = 2,
  Materials = 3,
  Summary = 4
}
