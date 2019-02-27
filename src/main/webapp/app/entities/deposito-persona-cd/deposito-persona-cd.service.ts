import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';

type EntityResponseType = HttpResponse<IDepositoPersonaCd>;
type EntityArrayResponseType = HttpResponse<IDepositoPersonaCd[]>;

@Injectable({ providedIn: 'root' })
export class DepositoPersonaCdService {
    public resourceUrl = SERVER_API_URL + 'api/deposito-personas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/deposito-personas';

    constructor(protected http: HttpClient) {}

    create(depositoPersona: IDepositoPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(depositoPersona);
        return this.http
            .post<IDepositoPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(depositoPersona: IDepositoPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(depositoPersona);
        return this.http
            .put<IDepositoPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDepositoPersonaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepositoPersonaCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepositoPersonaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(depositoPersona: IDepositoPersonaCd): IDepositoPersonaCd {
        const copy: IDepositoPersonaCd = Object.assign({}, depositoPersona, {
            fecha: depositoPersona.fecha != null && depositoPersona.fecha.isValid() ? depositoPersona.fecha.format(DATE_FORMAT) : null
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
            res.body.forEach((depositoPersona: IDepositoPersonaCd) => {
                depositoPersona.fecha = depositoPersona.fecha != null ? moment(depositoPersona.fecha) : null;
            });
        }
        return res;
    }
}
