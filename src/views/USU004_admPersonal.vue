<template>
  <div>
    <b-modal
      id="modal-personal"
      ref="modal"
      title="Agregar Personal"
      
      size="lg"
    >
     
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      
        <b-icon icon="x-circle" scale="2"  @click="close()" class="hand-on-cursor"></b-icon>
     
    </template>
    </b-modal>

    <b-container class="bv-example-row" style="padding-top:50px">
      <b-col>
   
          <b-col class="col-3">
            <b-row>
            <b-button v-b-modal.modal-personal style="border-radius: 20px; font-weight: bold; font-size: 20px; "  class="lsa-light-blue reactive-button">Agregar Personal</b-button> 
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
  components: {
  },
  data(){
    return{
      items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }
  }
}
</script>
