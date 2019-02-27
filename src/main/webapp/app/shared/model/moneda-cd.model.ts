export interface IMonedaCd {
    id?: number;
    nombre?: string;
    tipo?: string;
    simbolo?: string;
    descripcion?: string;
}

export class MonedaCd implements IMonedaCd {
    constructor(public id?: number, public nombre?: string, public tipo?: string, public simbolo?: string, public descripcion?: string) {}
}
