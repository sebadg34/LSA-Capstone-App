<template>
<div class="login" style="margin-top:100px">
    <validation-observer ref="form">
        <b-container>
            <b-skeleton-wrapper :loading="loading">
                <template #loading>
                    <br>
                    <br>
                    <br>
                    <b-row align-h="center">
                        <b-col sm="6">
                            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                            <p id="cancel-label">Por favor espere...</p>
                        </b-col>
                    </b-row>

                </template>

                <b-row style="text-align:center;" class="text-center" align-h="center">
                    <br>
                    <b-col sm="12" xs="12" lg="6">
                        <b-card header-class="lsa-blue" header-tag="header" header="Ingreso sistema administración LSA" text-variant="white">

                            <ValidationProvider name="correo" rules="required|email" v-slot="validationContext">
                                <b-input-group class="mb-2">

                                    <b-input-group-prepend is-text>
                                        <b-icon icon="person-fill"></b-icon>
                                    </b-input-group-prepend>
                                    <b-form-input v-model="Correo" :state="getValidationState(validationContext)" class="input-correo" name="correo" id="correo" type="text" aria-describedby="rut-live-feedback" placeholder="Correo electrónico"></b-form-input>
                                    <b-form-invalid-feedback id="correo-live-feedback">{{
                      validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-input-group>
                            </ValidationProvider>
                            <ValidationProvider name="password" rules="required" v-slot="validationContext">
                                <b-input-group class="mb-2">

                                    <b-input-group-prepend is-text>
                                        <b-icon icon="lock-fill"></b-icon>
                                    </b-input-group-prepend>
                                    <b-form-input :state="getValidationState(validationContext)" class="input-pass" name="password" type="password" aria-describedby="password-live-feedback" placeholder="Contraseña" v-model="Password"></b-form-input>
                                    <b-form-invalid-feedback id="password-live-feedback">{{
                      validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-input-group>
                            </ValidationProvider>
                            <br>
                            <b-overlay :show="Cargando"  opacity="0.6" spinner-small spinner-variant="primary" >

                                <b-button @click="enviarFormulario" id="button-interactive" class="reactive-button" type="submit" block style="font-weight: bold; font-size: 1.2rem;  background-color: var(--lsa-light-blue) !important; " pill>
                                    <b-spinner v-if="loading" small variant="primary" label="Spinning">
                                    </b-spinner> Iniciar Sesión <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon>
                                </b-button>
                            </b-overlay>

                        </b-card>
                    </b-col>
                </b-row>
            </b-skeleton-wrapper>
        </b-container>
    </validation-observer>
</div>
</template>

<script>
import userService from "@/helpers/api-services/Auth.service"
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
export default {
    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {
this.Cargando = true;
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {

                    var data = {
                        email: this.Correo,
                        password: this.Password
                    }
                    userService.login(data).then((response) => {
                      this.Cargando = false;
                        console.log(response)
                        if (response.status == 200) {
                          var data = getUserInfo();
                          this.$root.$bvToast.toast(`Ingreso exitoso \n Bienvenid@ ` + data.nombre + " "+ data.apellido, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    appendToast: true
                                })
                            this.$router.push("/inicio");
                        }
                    });

                }
            });

        }
    },
    data() {
        return {
            loading: false,
            Correo: "",
            Cargando: false,
            Password: ""
        }
    },
    name: 'HelloWorld',
    props: {
        msg: String
    }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
