import { Moment } from 'moment';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

export const enum MedioDePago {
    TRANSFERENCIAONLINE = 'TRANSFERENCIAONLINE',
    FISICO = 'FISICO',
    PAYPAL = 'PAYPAL',
    TARJETA = 'TARJETA',
    CHEQUE = 'CHEQUE',
    OTRO = 'OTRO'
}

export interface IDepositoPersonaCd {
    id?: number;
    numeroDeposito?: string;
    monto?: number;
    constanciaAdjuntoContentType?: string;
    constanciaAdjunto?: any;
    fecha?: Moment;
    tipoDeposito?: MedioDePago;
    estado?: string;
    usuario?: IUsuarioCd;
    banco?: IBancoCd;
    moneda?: IMonedaCd;
}

export class DepositoPersonaCd implements IDepositoPersonaCd {
    constructor(
        public id?: number,
        public numeroDeposito?: string,
        public monto?: number,
        public constanciaAdjuntoContentType?: string,
        public constanciaAdjunto?: any,
        public fecha?: Moment,
        public tipoDeposito?: MedioDePago,
        public estado?: string,
        public usuario?: IUsuarioCd,
        public banco?: IBancoCd,
        public moneda?: IMonedaCd
    ) {}
}
