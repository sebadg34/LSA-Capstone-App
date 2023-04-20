<template>
    
        <b-modal id="modal-personal" ref="modal" title="Agregar Personal" size="lg">

<template #modal-header="{ close }">
    <!-- Emulate built in modal header close button action -->

    <b-row class="d-flex justify-content-around">
        <div class="pl-3">Agregar Personal</div>

    </b-row>

    <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
    </button>
</template>

<b-row class="pb-2">
    <b-col class="col-6">
        <label for="input-live">Rut:</label>
        <b-form-input class="mb-1" id="input-live" v-model="name" :state="nameState"
            aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
        <label for="input-live">Apellidos:</label>
        <b-form-input class="mb-1" id="input-live" v-model="name" :state="nameState"
            aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
    </b-col>
    <b-col class="col-6">
        <label for="input-live">Nombres:</label>
        <b-form-input class="mb-1" id="input-live" v-model="name" :state="nameState"
            aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
        <label for="input-live">Correo:</label>
        <b-form-input class="mb-1" id="input-live" v-model="name" :state="nameState"
            aria-describedby="input-live-help input-live-feedback" placeholder="" trim></b-form-input>
    </b-col>
</b-row>
<hr>

<b-row class="pt-2">
    <b-col class="col-6">
        <label for="input-live">Telefono Movil:</label>
        <b-input-group class="mb-1">

            <b-input-group-prepend is-text>
                +56 9
            </b-input-group-prepend>
            <b-form-input id="input-live" v-model="name" :state="nameState"
                aria-describedby="input-live-help input-live-feedback" placeholder=""></b-form-input>

        </b-input-group>
        <label for="input-live">Contacto Emergencia:</label>
        <b-input-group class="mb-1">

            <b-input-group-prepend is-text>
                +56 9
            </b-input-group-prepend>
            <b-form-input id="input-live" v-model="name" :state="nameState"
                aria-describedby="input-live-help input-live-feedback" placeholder=""></b-form-input>

        </b-input-group>
    </b-col>
    <b-col class="col-6">
        <label for="input-live">Cargo:</label>
        <b-form-select class="mb-1" v-model="selected" :options="cargos"></b-form-select>
        <label for="input-live">Tipo Trabajador:</label>
        <b-form-select class="mb-1" v-model="selected" :options="tipos"></b-form-select>
    </b-col>
</b-row>

<template #modal-footer>

    <b-button variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold"
        @click="show = false">
        Crear y Guardar
    </b-button>

</template>

</b-modal>
    
</template>


<script>
export default {
    
}
</script>
<style lang="">
    
</style>