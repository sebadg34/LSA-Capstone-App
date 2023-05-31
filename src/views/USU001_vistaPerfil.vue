<template>
  <div>

   <div>VISTA Perfil</div>
<modal_cambiarPassword></modal_cambiarPassword>
   <b-button @click="abrirCambiarPassword()">Cambiar Contraseña</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import modal_cambiarPassword from '@/components/admUsuario/modal_cambiarPassword.vue'
export default {

  components: {
    modal_cambiarPassword
  },
  methods:{
    abrirCambiarPassword() {
            this.$bvModal.show('modal-cambiar-password')
        }
  }
}
</script>
