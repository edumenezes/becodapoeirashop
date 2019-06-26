import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vendas } from 'app/shared/model/vendas.model';
import { VendasService } from './vendas.service';
import { VendasComponent } from './vendas.component';
import { VendasDetailComponent } from './vendas-detail.component';
import { VendasUpdateComponent } from './vendas-update.component';
import { VendasDeletePopupComponent } from './vendas-delete-dialog.component';
import { IVendas } from 'app/shared/model/vendas.model';

@Injectable({ providedIn: 'root' })
export class VendasResolve implements Resolve<IVendas> {
  constructor(private service: VendasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVendas> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Vendas>) => response.ok),
        map((vendas: HttpResponse<Vendas>) => vendas.body)
      );
    }
    return of(new Vendas());
  }
}

export const vendasRoute: Routes = [
  {
    path: '',
    component: VendasComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Vendas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VendasDetailComponent,
    resolve: {
      vendas: VendasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vendas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VendasUpdateComponent,
    resolve: {
      vendas: VendasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vendas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VendasUpdateComponent,
    resolve: {
      vendas: VendasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vendas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const vendasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VendasDeletePopupComponent,
    resolve: {
      vendas: VendasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vendas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
