<template>
<div class="home">
    <div class="image-container">
<div style="height:50px"></div>
        <b-card  bg-variant="light"  class="card-inicio" style="min-height: 40vh;" >

            <template #header>
                <div class="row d-flex justify-content-center">
                    <span>Rol del sistema:</span>   <strong>{{rol_descripcion }}</strong>
                </div>
             
            </template>
            <b-card-text>
                Vista título
            </b-card-text>

        </b-card>

    </div>
</div>
</template>

<script>
// @ is an alias to /src

import user_roles from "../helpers/enums/roles.js";
import store from "@/store/store";
export default {
    data() {
        return {
            rol_descripcion: "descripcion_rol",
        }
    },
    mounted() {
        this.mostrarInfo();
    },
    name: 'HomeView',
    components: {

    },
    methods: {
        mostrarInfo() {
           this.rol_descripcion = user_roles.find(user => user.id_rol == store.getters.rol).descripcion;
        }
    }
}
</script>

<style scoped>
.card-inicio {
    width: 50%;

}

.image-container {
    background: url('../assets/background-1-large-LSA.jpg');
    width: 100vw;
    height: 100vh;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

}
</style>
