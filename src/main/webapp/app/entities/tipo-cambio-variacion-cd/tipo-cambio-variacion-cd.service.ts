import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoCambioVariacionCd } from 'app/shared/model/tipo-cambio-variacion-cd.model';

type EntityResponseType = HttpResponse<ITipoCambioVariacionCd>;
type EntityArrayResponseType = HttpResponse<ITipoCambioVariacionCd[]>;

@Injectable({ providedIn: 'root' })
export class TipoCambioVariacionCdService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-cambio-variacions';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-cambio-variacions';

    constructor(protected http: HttpClient) {}

    create(tipoCambioVariacion: ITipoCambioVariacionCd): Observable<EntityResponseType> {
        return this.http.post<ITipoCambioVariacionCd>(this.resourceUrl, tipoCambioVariacion, { observe: 'response' });
    }

    update(tipoCambioVariacion: ITipoCambioVariacionCd): Observable<EntityResponseType> {
        return this.http.put<ITipoCambioVariacionCd>(this.resourceUrl, tipoCambioVariacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoCambioVariacionCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoCambioVariacionCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoCambioVariacionCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
