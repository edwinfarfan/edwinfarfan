import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioRolCd } from 'app/shared/model/usuario-rol-cd.model';

type EntityResponseType = HttpResponse<IUsuarioRolCd>;
type EntityArrayResponseType = HttpResponse<IUsuarioRolCd[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioRolCdService {
    public resourceUrl = SERVER_API_URL + 'api/usuario-rols';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/usuario-rols';

    constructor(protected http: HttpClient) {}

    create(usuarioRol: IUsuarioRolCd): Observable<EntityResponseType> {
        return this.http.post<IUsuarioRolCd>(this.resourceUrl, usuarioRol, { observe: 'response' });
    }

    update(usuarioRol: IUsuarioRolCd): Observable<EntityResponseType> {
        return this.http.put<IUsuarioRolCd>(this.resourceUrl, usuarioRol, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsuarioRolCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioRolCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioRolCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
