export interface ITipoDocumentoCd {
    id?: number;
    nombre?: string;
    nombreCompleto?: string;
    descripcion?: string;
    estado?: string;
}

export class TipoDocumentoCd implements ITipoDocumentoCd {
    constructor(
        public id?: number,
        public nombre?: string,
        public nombreCompleto?: string,
        public descripcion?: string,
        public estado?: string
    ) {}
}
