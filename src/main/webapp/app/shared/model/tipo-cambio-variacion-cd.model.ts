import { ITipoCambioCd } from 'app/shared/model/tipo-cambio-cd.model';

export interface ITipoCambioVariacionCd {
    id?: number;
    variacionMonto?: number;
    variacionPorcentaje?: number;
    estado?: string;
    tipoCambio?: ITipoCambioCd;
}

export class TipoCambioVariacionCd implements ITipoCambioVariacionCd {
    constructor(
        public id?: number,
        public variacionMonto?: number,
        public variacionPorcentaje?: number,
        public estado?: string,
        public tipoCambio?: ITipoCambioCd
    ) {}
}
