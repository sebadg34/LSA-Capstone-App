import Vue from 'vue';
import Vuex from 'vuex';


//import SecureLS from "secure-ls";
//
//let ls = new SecureLS({
//    encodingType: "aes",
//    isCompression: false,
//    encryptionSecret: process.env.VUE_APP_STR_PWD
//});


Vue.use(Vuex);

import * as user from './modules/user'
const store = new Vuex.Store({

  modules:{
    user
  },
  
  state: {
    accessToken: null
  },
  getters: {
    rol () {
      return user.state.rol
    }
  },
  mutations: {
    setRol (state,rol) {
      // mutate state
      user.state.rol = rol;
    }
  }
})
export default store;