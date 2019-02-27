import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransaccionCambistaCd } from 'app/shared/model/transaccion-cambista-cd.model';

type EntityResponseType = HttpResponse<ITransaccionCambistaCd>;
type EntityArrayResponseType = HttpResponse<ITransaccionCambistaCd[]>;

@Injectable({ providedIn: 'root' })
export class TransaccionCambistaCdService {
    public resourceUrl = SERVER_API_URL + 'api/transaccion-cambistas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/transaccion-cambistas';

    constructor(protected http: HttpClient) {}

    create(transaccionCambista: ITransaccionCambistaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaccionCambista);
        return this.http
            .post<ITransaccionCambistaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transaccionCambista: ITransaccionCambistaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaccionCambista);
        return this.http
            .put<ITransaccionCambistaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransaccionCambistaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransaccionCambistaCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransaccionCambistaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(transaccionCambista: ITransaccionCambistaCd): ITransaccionCambistaCd {
        const copy: ITransaccionCambistaCd = Object.assign({}, transaccionCambista, {
            fecha:
                transaccionCambista.fecha != null && transaccionCambista.fecha.isValid()
                    ? transaccionCambista.fecha.format(DATE_FORMAT)
                    : null
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
            res.body.forEach((transaccionCambista: ITransaccionCambistaCd) => {
                transaccionCambista.fecha = transaccionCambista.fecha != null ? moment(transaccionCambista.fecha) : null;
            });
        }
        return res;
    }
}
