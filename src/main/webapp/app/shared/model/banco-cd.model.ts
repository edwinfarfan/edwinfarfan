export interface IBancoCd {
    id?: number;
    nombre?: string;
    nombreCompleto?: string;
    codigo?: string;
    logo?: string;
    direccion?: string;
}

export class BancoCd implements IBancoCd {
    constructor(
        public id?: number,
        public nombre?: string,
        public nombreCompleto?: string,
        public codigo?: string,
        public logo?: string,
        public direccion?: string
    ) {}
}
