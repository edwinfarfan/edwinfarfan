import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

type EntityResponseType = HttpResponse<IMonedaCd>;
type EntityArrayResponseType = HttpResponse<IMonedaCd[]>;

@Injectable({ providedIn: 'root' })
export class MonedaCdService {
    public resourceUrl = SERVER_API_URL + 'api/monedas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/monedas';

    constructor(protected http: HttpClient) {}

    create(moneda: IMonedaCd): Observable<EntityResponseType> {
        return this.http.post<IMonedaCd>(this.resourceUrl, moneda, { observe: 'response' });
    }

    update(moneda: IMonedaCd): Observable<EntityResponseType> {
        return this.http.put<IMonedaCd>(this.resourceUrl, moneda, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMonedaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMonedaCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMonedaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
