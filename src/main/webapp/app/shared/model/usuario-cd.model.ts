import { IPersonaCd } from 'app/shared/model/persona-cd.model';

export interface IUsuarioCd {
    id?: number;
    usuario?: string;
    password?: string;
    preguntaSecreta?: string;
    estado?: string;
    tiempoSesion?: number;
    persona?: IPersonaCd;
}

export class UsuarioCd implements IUsuarioCd {
    constructor(
        public id?: number,
        public usuario?: string,
        public password?: string,
        public preguntaSecreta?: string,
        public estado?: string,
        public tiempoSesion?: number,
        public persona?: IPersonaCd
    ) {}
}
