<template>
  <div id="app">
    <div class="container-fluid bg-secondary py-3 sticky-top shadow-lg" style="display: flex; align-items: center">
      <a href="#">
        <img src="https://www.irancho.com.br/wp-content/themes/irancho/imagens/logo-irancho.png" alt="iRancho" width="130" height="31"/>
      </a>
    
      <ul class="links-menu">
        <li>
          <router-link to='/pessoa'>Pessoa</router-link>
        </li>            
        <li>
          <router-link to='/animal'>Animal</router-link>
        </li>            
        <li>
          <router-link to='/lote'>Lote</router-link>
        </li>            
        <li>
          <router-link to='/animal-lote'>Animal x Lote</router-link>
        </li>            
      </ul>
    </div>
    <div class="container p-5">      
      <router-view></router-view>
    </div>
    <footer>
      <div class="container">
        <p>Guilherme Carmona</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      dados: []
    }
  } 
}
</script>

<style lang="scss">
@import './assets/styles/variables';
@import './assets/styles/bootstrap';
@import './assets/styles/vuebootstrap';

.links-menu {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin: 0;
}

.links-menu li{
  margin-left: 24px;
}

.links-menu li a{
  color: $light;
}

.router-link-active{
  color: $primary !important;
}
a,a:hover {
  text-decoration: none;
  cursor: pointer;
}

footer {
  width: 100%;
  height: 40px;
  background-color: $marrom;
  color: $light;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  position: fixed;
  bottom:0;
  left: 0;
}

</style>
