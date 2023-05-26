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
    count: 0,
    accessToken: null
  }
})
export default store;