import { Moment } from 'moment';
import { ITipoDocumentoCd } from 'app/shared/model/tipo-documento-cd.model';
import { IDireccionPersonaCd } from 'app/shared/model/direccion-persona-cd.model';
import { ITelefonoPersonaCd } from 'app/shared/model/telefono-persona-cd.model';

export const enum TipoPersona {
    NATURAL = 'NATURAL',
    JURIDICA = 'JURIDICA'
}

export const enum Genero {
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO'
}

export interface IPersonaCd {
    id?: number;
    nombre?: string;
    apellido?: string;
    tipoPersona?: TipoPersona;
    razonSocial?: string;
    numeroDocumento?: string;
    correo?: string;
    fechaNacimiento?: Moment;
    genero?: Genero;
    estado?: string;
    tipoDocumento?: ITipoDocumentoCd;
    direccions?: IDireccionPersonaCd[];
    telefonos?: ITelefonoPersonaCd[];
}

export class PersonaCd implements IPersonaCd {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public tipoPersona?: TipoPersona,
        public razonSocial?: string,
        public numeroDocumento?: string,
        public correo?: string,
        public fechaNacimiento?: Moment,
        public genero?: Genero,
        public estado?: string,
        public tipoDocumento?: ITipoDocumentoCd,
        public direccions?: IDireccionPersonaCd[],
        public telefonos?: ITelefonoPersonaCd[]
    ) {}
}
