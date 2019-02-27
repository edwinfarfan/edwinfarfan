import { IPersonaCd } from 'app/shared/model/persona-cd.model';

export interface IDireccionPersonaCd {
    id?: number;
    nombre?: string;
    tipo?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    persona?: IPersonaCd;
}

export class DireccionPersonaCd implements IDireccionPersonaCd {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipo?: string,
        public ciudad?: string,
        public provincia?: string,
        public pais?: string,
        public persona?: IPersonaCd
    ) {}
}
