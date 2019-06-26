import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVendas } from 'app/shared/model/vendas.model';

type EntityResponseType = HttpResponse<IVendas>;
type EntityArrayResponseType = HttpResponse<IVendas[]>;

@Injectable({ providedIn: 'root' })
export class VendasService {
  public resourceUrl = SERVER_API_URL + 'api/vendas';

  constructor(protected http: HttpClient) {}

  create(vendas: IVendas): Observable<EntityResponseType> {
    return this.http.post<IVendas>(this.resourceUrl, vendas, { observe: 'response' });
  }

  update(vendas: IVendas): Observable<EntityResponseType> {
    return this.http.put<IVendas>(this.resourceUrl, vendas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVendas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVendas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
