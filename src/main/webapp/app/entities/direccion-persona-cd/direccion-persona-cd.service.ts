import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';

type EntityResponseType = HttpResponse<IDireccionPersonaCd>;
type EntityArrayResponseType = HttpResponse<IDireccionPersonaCd[]>;

@Injectable({ providedIn: 'root' })
export class DireccionPersonaCdService {
    public resourceUrl = SERVER_API_URL + 'api/direccion-personas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/direccion-personas';

    constructor(protected http: HttpClient) {}

    create(direccionPersona: IDireccionPersonaCd): Observable<EntityResponseType> {
        return this.http.post<IDireccionPersonaCd>(this.resourceUrl, direccionPersona, { observe: 'response' });
    }

    update(direccionPersona: IDireccionPersonaCd): Observable<EntityResponseType> {
        return this.http.put<IDireccionPersonaCd>(this.resourceUrl, direccionPersona, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDireccionPersonaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDireccionPersonaCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDireccionPersonaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
