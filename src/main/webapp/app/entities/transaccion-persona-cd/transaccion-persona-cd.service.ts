import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';

type EntityResponseType = HttpResponse<ITransaccionPersonaCd>;
type EntityArrayResponseType = HttpResponse<ITransaccionPersonaCd[]>;

@Injectable({ providedIn: 'root' })
export class TransaccionPersonaCdService {
    public resourceUrl = SERVER_API_URL + 'api/transaccion-personas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/transaccion-personas';

    constructor(protected http: HttpClient) {}

    create(transaccionPersona: ITransaccionPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaccionPersona);
        return this.http
            .post<ITransaccionPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transaccionPersona: ITransaccionPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaccionPersona);
        return this.http
            .put<ITransaccionPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransaccionPersonaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransaccionPersonaCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransaccionPersonaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(transaccionPersona: ITransaccionPersonaCd): ITransaccionPersonaCd {
        const copy: ITransaccionPersonaCd = Object.assign({}, transaccionPersona, {
            fecha:
                transaccionPersona.fecha != null && transaccionPersona.fecha.isValid() ? transaccionPersona.fecha.format(DATE_FORMAT) : null
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
            res.body.forEach((transaccionPersona: ITransaccionPersonaCd) => {
                transaccionPersona.fecha = transaccionPersona.fecha != null ? moment(transaccionPersona.fecha) : null;
            });
        }
        return res;
    }
}
