import { Moment } from 'moment';
import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { IBancoCd } from 'app/shared/model/banco-cd.model';
import { IMonedaCd } from 'app/shared/model/moneda-cd.model';
import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';
import { IDepositoPersonaCd } from 'app/shared/model/deposito-persona-cd.model';
import { ICuentaBancariaCd } from 'app/shared/model/cuenta-bancaria-cd.model';
import { IDepositoCambistaCd } from 'app/shared/model/deposito-cambista-cd.model';

export interface ITransaccionPersonaCd {
    id?: number;
    montoAComprar?: number;
    montoTotal?: number;
    estado?: string;
    fecha?: Moment;
    comentario?: string;
    usuario?: IUsuarioCd;
    bancoOrigen?: IBancoCd;
    bancoDestino?: IBancoCd;
    monedaAComprar?: IMonedaCd;
    tipoCambio?: ITipoCambioCd;
    depositoPersona?: IDepositoPersonaCd;
    cuentaDestinoPersona?: ICuentaBancariaCd;
    monedaMontoTotal?: IMonedaCd;
    depositoCambista?: IDepositoCambistaCd;
}

export class TransaccionPersonaCd implements ITransaccionPersonaCd {
    constructor(
        public id?: number,
        public montoAComprar?: number,
        public montoTotal?: number,
        public estado?: string,
        public fecha?: Moment,
        public comentario?: string,
        public usuario?: IUsuarioCd,
        public bancoOrigen?: IBancoCd,
        public bancoDestino?: IBancoCd,
        public monedaAComprar?: IMonedaCd,
        public tipoCambio?: ITipoCambioCd,
        public depositoPersona?: IDepositoPersonaCd,
        public cuentaDestinoPersona?: ICuentaBancariaCd,
        public monedaMontoTotal?: IMonedaCd,
        public depositoCambista?: IDepositoCambistaCd
    ) {}
}
