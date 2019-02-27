import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';

type EntityResponseType = HttpResponse<ITipoCambioCd>;
type EntityArrayResponseType = HttpResponse<ITipoCambioCd[]>;

@Injectable({ providedIn: 'root' })
export class TipoCambioCdService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-cambios';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-cambios';

    constructor(protected http: HttpClient) {}

    create(tipoCambio: ITipoCambioCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tipoCambio);
        return this.http
            .post<ITipoCambioCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tipoCambio: ITipoCambioCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tipoCambio);
        return this.http
            .put<ITipoCambioCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITipoCambioCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITipoCambioCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITipoCambioCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(tipoCambio: ITipoCambioCd): ITipoCambioCd {
        const copy: ITipoCambioCd = Object.assign({}, tipoCambio, {
            fecha: tipoCambio.fecha != null && tipoCambio.fecha.isValid() ? tipoCambio.fecha.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((tipoCambio: ITipoCambioCd) => {
                tipoCambio.fecha = tipoCambio.fecha != null ? moment(tipoCambio.fecha) : null;
            });
        }
        return res;
    }
}
