import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';

export interface ICuentaBancariaCd {
    id?: number;
    numeroCuenta?: string;
    banco?: IBancoCd;
    usuario?: IUsuarioCd;
}

export class CuentaBancariaCd implements ICuentaBancariaCd {
    constructor(public id?: number, public numeroCuenta?: string, public banco?: IBancoCd, public usuario?: IUsuarioCd) {}
}
