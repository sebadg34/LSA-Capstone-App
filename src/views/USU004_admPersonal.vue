<template>
    <div>


        <b-container class="bv-example-row" style="padding-top:50px; padding-left:0px;padding-right: 0px;">
            <b-col class="col-12">

                <b-col class="col-3">
                    <b-row>
                        <b-button v-b-modal.modal-personal style="border-radius: 15px; font-weight: bold; font-size: 18px; "
                            class="lsa-light-blue reactive-button">

                            Agregar Personal
                            <b-icon icon="person-plus-fill"></b-icon>
                        </b-button>
                    </b-row>
                </b-col>
                <b-row class="pt-5">

                </b-row>

            </b-col>

        </b-container>
        <b-table :fields="campos_tabla" :items="items" style="">

            <template #cell(accion)="data">
                <b-button style=" heigth: 25px; border-style: none; width: 25px; padding: 0px; background-color: white;"
                    @click="redireccionarEdicion_click(data.item)" class="mr-2">

                    <b-icon style="height: 80%; width: 80%; align-items: center;" icon="pencil-fill" variant="dark"
                        aria-hidden="true"></b-icon>

                </b-button>

            </template>
        </b-table>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'admPersonal',
    components: {},
    data() {
        return {
            Nombre: "",
            Rut: "",
            Correo: "",
            Apellidos: "",
            Movil: "",
            Emergencia: "",
            Cargo: "",
            Tipo: "",
            campos_tabla: [{ key: 'rut', label: 'Rut' }
                , { key: 'nombre', label: 'Nombre' }
                , { key: 'apellido', label: 'Apellido' }
                , { key: 'correo', label: 'Correo' }
                , { key: 'cargo', label: 'Cargo' }
                , { key: 'estado', label: 'Estado' }
                , { key: 'accion', label: 'Acción' }],
            tipos: [{
                value: 'practicante',
                text: 'Practicante'
            },
            {
                value: 'plazofijo',
                text: 'Contrato Plazo Fijo'
            },
            {
                value: 'plazoindefinido',
                text: 'Contrato Plazo Indefinido'
            },
            {
                value: 'honorario',
                text: 'Contrato Honorario'
            },
            ],
            cargos: [{
                value: 'gerente',
                text: 'Gerente'
            },
            {
                value: 'jefe',
                text: 'Jefe(a) de laboratorio'
            },
            {
                value: 'supervisor',
                text: 'Supervisor(a)'
            },
            {
                value: 'finanzas',
                text: 'Administrador de finanzas'
            },
            {
                value: 'analista',
                text: 'Analista Químico'
            },
            {
                value: 'quimico',
                text: 'Químico'
            },
            ], 
            items: [{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },
            {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'pruebaEstado',
                accion: 'pruebaAccion'
            },
            ]
        }
    }
}
</script>
