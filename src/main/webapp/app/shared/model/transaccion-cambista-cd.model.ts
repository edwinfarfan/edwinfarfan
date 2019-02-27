import { Moment } from 'moment';
import { ITransaccionPersonaCd } from 'app/shared/model/transaccion-persona-cd.model';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';

export interface ITransaccionCambistaCd {
    id?: number;
    impuesto?: number;
    estado?: string;
    fecha?: Moment;
    transaccionPersona?: ITransaccionPersonaCd;
    idDepositoCambista?: IDepositoCambistaCd;
}

export class TransaccionCambistaCd implements ITransaccionCambistaCd {
    constructor(
        public id?: number,
        public impuesto?: number,
        public estado?: string,
        public fecha?: Moment,
        public transaccionPersona?: ITransaccionPersonaCd,
        public idDepositoCambista?: IDepositoCambistaCd
    ) {}
}
