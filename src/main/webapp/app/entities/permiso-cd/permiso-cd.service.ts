import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPermisoCd } from 'app/shared/model/permiso-cd.model';

type EntityResponseType = HttpResponse<IPermisoCd>;
type EntityArrayResponseType = HttpResponse<IPermisoCd[]>;

@Injectable({ providedIn: 'root' })
export class PermisoCdService {
    public resourceUrl = SERVER_API_URL + 'api/permisos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/permisos';

    constructor(protected http: HttpClient) {}

    create(permiso: IPermisoCd): Observable<EntityResponseType> {
        return this.http.post<IPermisoCd>(this.resourceUrl, permiso, { observe: 'response' });
    }

    update(permiso: IPermisoCd): Observable<EntityResponseType> {
        return this.http.put<IPermisoCd>(this.resourceUrl, permiso, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPermisoCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPermisoCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPermisoCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
