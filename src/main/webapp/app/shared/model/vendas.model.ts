import { IVendedor } from 'app/shared/model/vendedor.model';

export interface IVendas {
  id?: number;
  countryName?: string;
  vendedor?: IVendedor;
}

export class Vendas implements IVendas {
  constructor(public id?: number, public countryName?: string, public vendedor?: IVendedor) {}
}
