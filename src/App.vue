<template>
  <div id="app">


<b-navbar style="height:75px;background-color: #ebebeb">


 <div style="width: 100%" class="d-flex justify-content-between">
 
 <b-navbar-brand>
 <b-img  :src="require('@/assets/isologo-UCN.png')" style="height: 75px; padding: 5px" alt="Image 1"></b-img>
 </b-navbar-brand>
  <b-navbar-brand>
 <b-img  :src="require('@/assets/isologo-LSA.png')" style="height: 75px; padding: 5px" alt="Image 1"></b-img>
 </b-navbar-brand>
   

 </div>
 
</b-navbar>

<!--
    <b-navbar toggleable="lg" style="background-color: pink" class="my-custom-nav">
    <b-navbar-brand href="#" class="ml-3">
        <img src="/assets/LSA.png" alt="Logo" class="my-logo img-fluid">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>


      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item href="#" class="my-nav-item">Home </b-nav-item>
        <b-nav-item href="#" class="my-nav-item">Ayuda </b-nav-item>
        <b-nav-item href="https://www.ucn.cl" class="my-nav-item">UCN </b-nav-item>
        
      </b-navbar-nav>

      

     
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <img src="/assets/ucn.png" alt="Second Image" class="segunda img-fluid">
        </b-nav-item>
      </b-navbar-nav>
     
    </b-collapse>
    </b-navbar>
-->

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
