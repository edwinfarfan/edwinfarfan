export interface IRolCd {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export class RolCd implements IRolCd {
    constructor(public id?: number, public nombre?: string, public descripcion?: string) {}
}
