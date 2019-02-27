import { Moment } from 'moment';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';

export interface IDepositoCambistaCd {
    id?: number;
    numeroDeposito?: string;
    monto?: number;
    constanciaAdjuntoContentType?: string;
    constanciaAdjunto?: any;
    fecha?: Moment;
    estado?: string;
    usuario?: IUsuarioCd;
    banco?: IBancoCd;
    moneda?: IMonedaCd;
}

export class DepositoCambistaCd implements IDepositoCambistaCd {
    constructor(
        public id?: number,
        public numeroDeposito?: string,
        public monto?: number,
        public constanciaAdjuntoContentType?: string,
        public constanciaAdjunto?: any,
        public fecha?: Moment,
        public estado?: string,
        public usuario?: IUsuarioCd,
        public banco?: IBancoCd,
        public moneda?: IMonedaCd
    ) {}
}
