import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';

type EntityResponseType = HttpResponse<IDepositoCambistaCd>;
type EntityArrayResponseType = HttpResponse<IDepositoCambistaCd[]>;

@Injectable({ providedIn: 'root' })
export class DepositoCambistaCdService {
    public resourceUrl = SERVER_API_URL + 'api/deposito-cambistas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/deposito-cambistas';

    constructor(protected http: HttpClient) {}

    create(depositoCambista: IDepositoCambistaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(depositoCambista);
        return this.http
            .post<IDepositoCambistaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(depositoCambista: IDepositoCambistaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(depositoCambista);
        return this.http
            .put<IDepositoCambistaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDepositoCambistaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepositoCambistaCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepositoCambistaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(depositoCambista: IDepositoCambistaCd): IDepositoCambistaCd {
        const copy: IDepositoCambistaCd = Object.assign({}, depositoCambista, {
            fecha: depositoCambista.fecha != null && depositoCambista.fecha.isValid() ? depositoCambista.fecha.format(DATE_FORMAT) : null
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
            res.body.forEach((depositoCambista: IDepositoCambistaCd) => {
                depositoCambista.fecha = depositoCambista.fecha != null ? moment(depositoCambista.fecha) : null;
            });
        }
        return res;
    }
}
