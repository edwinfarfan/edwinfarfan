import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRolCd } from 'app/shared/model/rol-cd.model';

type EntityResponseType = HttpResponse<IRolCd>;
type EntityArrayResponseType = HttpResponse<IRolCd[]>;

@Injectable({ providedIn: 'root' })
export class RolCdService {
    public resourceUrl = SERVER_API_URL + 'api/rols';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/rols';

    constructor(protected http: HttpClient) {}

    create(rol: IRolCd): Observable<EntityResponseType> {
        return this.http.post<IRolCd>(this.resourceUrl, rol, { observe: 'response' });
    }

    update(rol: IRolCd): Observable<EntityResponseType> {
        return this.http.put<IRolCd>(this.resourceUrl, rol, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRolCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRolCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRolCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
