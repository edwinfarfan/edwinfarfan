import { IPersonaCd } from 'app/shared/model/persona-cd.model';

export interface ITelefonoPersonaCd {
    id?: number;
    nombre?: string;
    tipo?: string;
    descripcion?: string;
    numero?: string;
    persona?: IPersonaCd;
}

export class TelefonoPersonaCd implements ITelefonoPersonaCd {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipo?: string,
        public descripcion?: string,
        public numero?: string,
        public persona?: IPersonaCd
    ) {}
}
