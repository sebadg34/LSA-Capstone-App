<template>
    
        <b-modal id="modal-editar-personal" ref="modal" title="Agregar Personal" size="lg">

<template #modal-header="{ close }">
    <!-- Emulate built in modal header close button action -->

    <b-row class="d-flex justify-content-around">
        <div class="pl-3">Editar personal</div>

    </b-row>

    <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
    </button>
</template>


<template #modal-footer>

    <b-button variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold"
        @click="show = false">
        Cerrar
    </b-button>

</template>

</b-modal>
    
</template>


<script>
export default {
    data() {
        return {
             Nombre: "",
            Rut: "",
            Correo: "",
            Apellidos: "",
            Movil: "",
            Emergencia: "",
            Cargo: "",
            Tipo: "",tipos: [{
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
        }
    },
}
</script>
<style lang="">
    
</style>