<template>
    <div class="login" style="margin-top:100px">
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
                    <b-card header-class="lsa-blue" header-tag="header" header="Ingreso sistema muestras LSA" text-variant="white">
                      

                       
                                        <b-input-group class="mb-2">
                                            <b-input-group-prepend is-text>
                                                <b-icon icon="person-fill"></b-icon>
                                            </b-input-group-prepend>
                                            <b-form-input class="input-rut" name="rut" id="rut" type="text" aria-describedby="rut-live-feedback"  placeholder="Rut"></b-form-input>
                                          
                                        </b-input-group>
                                 

                                   
                                        <b-input-group class="mb-2">
                                            <b-input-group-prepend is-text>
                                                <b-icon icon="lock-fill"></b-icon>
                                            </b-input-group-prepend>
                                            <b-form-input class="input-pass" name="password" type="password" aria-describedby="password-live-feedback"  placeholder="Contraseña"></b-form-input>
                                         
                                        </b-input-group>
                                  

                                    <br>
                                    
                                    <b-button @click="enviarFormulario" id="button-interactive"  type="submit" block style="font-weight: bold; font-size: 1.2rem;  background-color: var(--lsa-orange) !important; " pill>
                                        <b-spinner v-if="loading" small variant="primary" label="Spinning">
                                        </b-spinner> Iniciar Sesión <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon>
                                    </b-button>

                    
                    </b-card>
                </b-col>
            </b-row>
        </b-skeleton-wrapper>
    </b-container>
</div>
  </template>
  
  <script>
  import userService from "@/helpers/api-services/User.service"
  export default {
    methods:{
      enviarFormulario() {
        var data = {
          test:"test"
        }
        userService.login(data).then((response) => {
          console.log(response)
        });
      } 
    },
    data() {
      return {
        loading: false
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
  