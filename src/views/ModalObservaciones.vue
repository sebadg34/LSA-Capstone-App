<template>
    <div>
      <b-modal v-model="showModal" title="Observaciones de la muestra" @hidden="onHidden">
        <b-form-group label="Observaciones">
          <b-form-textarea v-model="observaciones" rows="3"></b-form-textarea>
        </b-form-group>
      </b-modal>
    </div>
  </template>
  
  <script> 
  export default {
    props: {
      
    },
    data() {
      return {
        showModal: true,
        observaciones: ''
      }
    },
    methods: {
      onHidden() {
        this.showModal = false;
        this.$emit('modal-cerrado');
      }
    }
  }
  </script>