import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';

type EntityResponseType = HttpResponse<ICuentaBancariaCd>;
type EntityArrayResponseType = HttpResponse<ICuentaBancariaCd[]>;

@Injectable({ providedIn: 'root' })
export class CuentaBancariaCdService {
    public resourceUrl = SERVER_API_URL + 'api/cuenta-bancarias';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/cuenta-bancarias';

    constructor(protected http: HttpClient) {}

    create(cuentaBancaria: ICuentaBancariaCd): Observable<EntityResponseType> {
        return this.http.post<ICuentaBancariaCd>(this.resourceUrl, cuentaBancaria, { observe: 'response' });
    }

    update(cuentaBancaria: ICuentaBancariaCd): Observable<EntityResponseType> {
        return this.http.put<ICuentaBancariaCd>(this.resourceUrl, cuentaBancaria, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICuentaBancariaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICuentaBancariaCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICuentaBancariaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
