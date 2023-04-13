<template>
<div>
    <b-modal id="modal-personal" ref="modal" title="Agregar Personal" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Personal</div>

            </b-row>

            <b-icon icon="x-circle" scale="2" @click="close()"  class="hand-on-cursor align-self-end"></b-icon>

        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">Rut:</label>
                <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
                <label for="input-live">Apellidos:</label>
                <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
            </b-col>
            <b-col class="col-6">
                <label for="input-live">Nombres:</label>
                <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
                <label for="input-live">Correo:</label>
                <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
            </b-col>
        </b-row>
        <hr>

        <b-row class="pt-2">
            <b-col class="col-6">
                <label for="input-live">Telefono Movil:</label>
                <b-input-group>

                    <b-input-group-prepend is-text>
                        +56 9
                    </b-input-group-prepend>
                    <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder=""></b-form-input>

                </b-input-group>
                <label for="input-live">Contacto Emergencia:</label>
                <b-input-group>

                    <b-input-group-prepend is-text>
                        +56 9
                    </b-input-group-prepend>
                    <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder=""></b-form-input>

                </b-input-group>
            </b-col>
            <b-col class="col-6">
                <label for="input-live">Cargo:</label>
                <b-form-select v-model="selected" :options="cargos"></b-form-select>
                <label for="input-live">Tipo Trabajador:</label>
                <b-form-input id="input-live" v-model="name" :state="nameState" aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
            </b-col>
        </b-row>

        <template #modal-footer>

            <b-button variant="primary" size="xl" class="float-right" @click="show=false">
                Crear y Guardar
            </b-button>

        </template>

    </b-modal>

    <b-container class="bv-example-row" style="padding-top:50px">
        <b-col>

            <b-col class="col-3">
                <b-row>
                    <b-button v-b-modal.modal-personal style="border-radius: 20px; font-weight: bold; font-size: 20px; " class="lsa-light-blue reactive-button">Agregar Personal</b-button>
                </b-row>
            </b-col>
            <b-row class="pt-5">
                <b-table striped hover :items="items"></b-table>
            </b-row>

        </b-col>

    </b-container>
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
                    age: 40,
                    first_name: 'Dickerson',
                    last_name: 'Macdonald'
                },
                {
                    age: 21,
                    first_name: 'Larsen',
                    last_name: 'Shaw'
                },
                {
                    age: 89,
                    first_name: 'Geneva',
                    last_name: 'Wilson'
                },
                {
                    age: 38,
                    first_name: 'Jami',
                    last_name: 'Carney'
                }
            ]
        }
    }
}
</script>
