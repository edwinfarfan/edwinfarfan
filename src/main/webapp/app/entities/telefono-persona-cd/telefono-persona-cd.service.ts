import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';

type EntityResponseType = HttpResponse<ITelefonoPersonaCd>;
type EntityArrayResponseType = HttpResponse<ITelefonoPersonaCd[]>;

@Injectable({ providedIn: 'root' })
export class TelefonoPersonaCdService {
    public resourceUrl = SERVER_API_URL + 'api/telefono-personas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/telefono-personas';

    constructor(protected http: HttpClient) {}

    create(telefonoPersona: ITelefonoPersonaCd): Observable<EntityResponseType> {
        return this.http.post<ITelefonoPersonaCd>(this.resourceUrl, telefonoPersona, { observe: 'response' });
    }

    update(telefonoPersona: ITelefonoPersonaCd): Observable<EntityResponseType> {
        return this.http.put<ITelefonoPersonaCd>(this.resourceUrl, telefonoPersona, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITelefonoPersonaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITelefonoPersonaCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITelefonoPersonaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
