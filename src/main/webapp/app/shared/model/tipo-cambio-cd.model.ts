import { Moment } from 'moment';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

export const enum TipoOperacion {
    COMPRA = 'COMPRA',
    VENTA = 'VENTA'
}

export interface ITipoCambioCd {
    id?: number;
    fecha?: Moment;
    tipoOperacion?: TipoOperacion;
    valor?: number;
    estado?: string;
    moneda?: IMonedaCd;
}

export class TipoCambioCd implements ITipoCambioCd {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public tipoOperacion?: TipoOperacion,
        public valor?: number,
        public estado?: string,
        public moneda?: IMonedaCd
    ) {}
}
