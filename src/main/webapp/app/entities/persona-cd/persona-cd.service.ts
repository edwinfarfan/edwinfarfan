import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonaCd } from 'app/shared/model/persona-cd.model';

type EntityResponseType = HttpResponse<IPersonaCd>;
type EntityArrayResponseType = HttpResponse<IPersonaCd[]>;

@Injectable({ providedIn: 'root' })
export class PersonaCdService {
    public resourceUrl = SERVER_API_URL + 'api/personas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/personas';

    constructor(protected http: HttpClient) {}

    create(persona: IPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .post<IPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(persona: IPersonaCd): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .put<IPersonaCd>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersonaCd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonaCd[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonaCd[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(persona: IPersonaCd): IPersonaCd {
        const copy: IPersonaCd = Object.assign({}, persona, {
            fechaNacimiento:
                persona.fechaNacimiento != null && persona.fechaNacimiento.isValid() ? persona.fechaNacimiento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((persona: IPersonaCd) => {
                persona.fechaNacimiento = persona.fechaNacimiento != null ? moment(persona.fechaNacimiento) : null;
            });
        }
        return res;
    }
}
