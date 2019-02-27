export interface IPermisoCd {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export class PermisoCd implements IPermisoCd {
    constructor(public id?: number, public nombre?: string, public descripcion?: string) {}
}
