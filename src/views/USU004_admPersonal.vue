<template>
    <div style="margin-bottom:50px">

<modal_agregarPersonal/>
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
  <b-row class="justify-content-center">
        <b-col class="col-10">
<b-table :fields="campos_tabla" :items="items" style="">
<template #cell(estado)="row">

<span v-if="row.item.estado =='activado'" style="text-transform:capitalize; color:green">{{(row.item.estado).toLowerCase()}}</span>
<span v-else style="text-transform:capitalize; color:red">{{(row.item.estado).toLowerCase()}}</span>
</template>
            <template #cell(accion)="data">
                <b-button style=" heigth: 25px; border-style: none; width: 25px; padding: 0px; background-color: white;"
                    @click="redireccionarEdicion_click(data.item)" class="mr-2">

                    <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark"
                        aria-hidden="true"></b-icon>

                </b-button>

            </template>
        </b-table>
        </b-col>
  </b-row>

    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'admPersonal',
    components: {},
    data() {
        return {
            campos_tabla: [{ key: 'rut', label: 'Rut' }
                , { key: 'nombre', label: 'Nombre' }
                , { key: 'apellido', label: 'Apellido' }
                , { key: 'correo', label: 'Correo' }
                , { key: 'cargo', label: 'Cargo' }
                , { key: 'estado', label: 'Estado' }
                , { key: 'accion', label: 'Acción' }], 
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
                estado: 'activado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'activado',
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
                estado: 'activado',
                accion: 'pruebaAccion'
            },{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'activado',
                accion: 'pruebaAccion'
            },
            ]
        }
    }
}
</script>
