import { IVendas } from 'app/shared/model/vendas.model';

export interface IVendedor {
  id?: number;
  nome?: string;
  vendas?: IVendas[];
}

export class Vendedor implements IVendedor {
  constructor(public id?: number, public nome?: string, public vendas?: IVendas[]) {}
}
