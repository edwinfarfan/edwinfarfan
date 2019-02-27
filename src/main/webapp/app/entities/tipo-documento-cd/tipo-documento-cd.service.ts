import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';

type EntityResponseType = HttpResponse<ITipoDocumentoCd>;
type EntityArrayResponseType = HttpResponse<ITipoDocumentoCd[]>;

@Injectable({ providedIn: 'root' })
export class TipoDocumentoCdService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-documentos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-documentos';

    constructor(protected http: HttpClient) {}

    create(tipoDocumento: ITipoDocumentoCd): Observable<EntityResponseType> {
        return this.http.post<ITipoDocumentoCd>(this.resourceUrl, tipoDocumento, { observe: 'response' });
    }

    update(tipoDocumento: ITipoDocumentoCd): Observable<EntityResponseType> {
        return this.http.put<ITipoDocumentoCd>(this.resourceUrl, tipoDocumento, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoDocumentoCd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoDocumentoCd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoDocumentoCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
