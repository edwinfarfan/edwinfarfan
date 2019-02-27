import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';

type EntityResponseType = HttpResponse<IUsuarioCd>;
type EntityArrayResponseType = HttpResponse<IUsuarioCd[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioCdService {
    public resourceUrl = SERVER_API_URL + 'api/usuarios';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/usuarios';

    constructor(protected http: HttpClient) {}

    create(usuario: IUsuarioCd): Observable<EntityResponseType> {
        return this.http.post<IUsuarioCd>(this.resourceUrl, usuario, { observe: 'response' });
    }

    update(usuario: IUsuarioCd): Observable<EntityResponseType> {
        return this.http.put<IUsuarioCd>(this.resourceUrl, usuario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsuarioCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
