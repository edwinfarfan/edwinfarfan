import { IUsuarioCd } from 'app/shared/model/usuario-cd.model';
import { IRolCd } from 'app/shared/model/rol-cd.model';
import { IPermisoCd } from 'app/shared/model/permiso-cd.model';

export interface IUsuarioRolCd {
    id?: number;
    usuario?: IUsuarioCd;
    rol?: IRolCd;
    permiso?: IPermisoCd;
}

export class UsuarioRolCd implements IUsuarioRolCd {
    constructor(public id?: number, public usuario?: IUsuarioCd, public rol?: IRolCd, public permiso?: IPermisoCd) {}
}
