import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'persona-cd',
                loadChildren: './persona-cd/persona-cd.module#CambistaDigitalPersonaCdModule'
            },
            {
                path: 'usuario-cd',
                loadChildren: './usuario-cd/usuario-cd.module#CambistaDigitalUsuarioCdModule'
            },
            {
                path: 'tipo-documento-cd',
                loadChildren: './tipo-documento-cd/tipo-documento-cd.module#CambistaDigitalTipoDocumentoCdModule'
            },
            {
                path: 'telefono-persona-cd',
                loadChildren: './telefono-persona-cd/telefono-persona-cd.module#CambistaDigitalTelefonoPersonaCdModule'
            },
            {
                path: 'usuario-rol-cd',
                loadChildren: './usuario-rol-cd/usuario-rol-cd.module#CambistaDigitalUsuarioRolCdModule'
            },
            {
                path: 'rol-cd',
                loadChildren: './rol-cd/rol-cd.module#CambistaDigitalRolCdModule'
            },
            {
                path: 'permiso-cd',
                loadChildren: './permiso-cd/permiso-cd.module#CambistaDigitalPermisoCdModule'
            },
            {
                path: 'cuenta-bancaria-cd',
                loadChildren: './cuenta-bancaria-cd/cuenta-bancaria-cd.module#CambistaDigitalCuentaBancariaCdModule'
            },
            {
                path: 'direccion-persona-cd',
                loadChildren: './direccion-persona-cd/direccion-persona-cd.module#CambistaDigitalDireccionPersonaCdModule'
            },
            {
                path: 'moneda-cd',
                loadChildren: './moneda-cd/moneda-cd.module#CambistaDigitalMonedaCdModule'
            },
            {
                path: 'banco-cd',
                loadChildren: './banco-cd/banco-cd.module#CambistaDigitalBancoCdModule'
            },
            {
                path: 'deposito-persona-cd',
                loadChildren: './deposito-persona-cd/deposito-persona-cd.module#CambistaDigitalDepositoPersonaCdModule'
            },
            {
                path: 'transaccion-persona-cd',
                loadChildren: './transaccion-persona-cd/transaccion-persona-cd.module#CambistaDigitalTransaccionPersonaCdModule'
            },
            {
                path: 'transaccion-cambista-cd',
                loadChildren: './transaccion-cambista-cd/transaccion-cambista-cd.module#CambistaDigitalTransaccionCambistaCdModule'
            },
            {
                path: 'deposito-cambista-cd',
                loadChildren: './deposito-cambista-cd/deposito-cambista-cd.module#CambistaDigitalDepositoCambistaCdModule'
            },
            {
                path: 'tipo-cambio-cd',
                loadChildren: './tipo-cambio-cd/tipo-cambio-cd.module#CambistaDigitalTipoCambioCdModule'
            },
            {
                path: 'tipo-cambio-variacion-cd',
                loadChildren: './tipo-cambio-variacion-cd/tipo-cambio-variacion-cd.module#CambistaDigitalTipoCambioVariacionCdModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CambistaDigitalEntityModule {}
