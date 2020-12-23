import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, ToastPlugin } from 'bootstrap-vue';
import App from './App.vue';
import Pessoa from './components/Pessoa/Pessoa';
import CriarPessoa from './components/Pessoa/CriarPessoa';
import EditarPessoa from './components/Pessoa/EditarPessoa';
import Animal from './components/Animal/Animal';
import CriarAnimal from './components/Animal/CriarAnimal';
import EditarAnimal from './components/Animal/EditarAnimal';
import Lote from './components/Lote/Lote';
import CriarLote from './components/Lote/CriarLote';
import EditarLote from './components/Lote/EditarLote';
import AnimalLote from './components/AnimalLote/AnimalLote';
import CriarAnimalLote from './components/AnimalLote/CriarAnimalLote';
import EditarAnimalLote from './components/AnimalLote/EditarAnimalLote';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(BootstrapVue);
Vue.use(ToastPlugin);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/pessoa' },
    { path: '/pessoa', component: Pessoa },
    { path: '/pessoa/criar', component: CriarPessoa },
    {
      path: '/pessoa/editar/:id',
      name: 'editar-pessoa',
      component: EditarPessoa,
    },
    { path: '/animal', component: Animal },
    { path: '/animal/criar', component: CriarAnimal },
    {
      path: '/animal/editar/:id',
      name: 'editar-animal',
      component: EditarAnimal,
    },
    { path: '/lote', component: Lote },
    { path: '/lote/criar', component: CriarLote },
    {
      path: '/lote/editar/:id',
      name: 'editar-lote',
      component: EditarLote,
    },
    { path: '/animal-lote', component: AnimalLote },
    { path: '/animal-lote/criar', component: CriarAnimalLote },
    {
      path: '/animal-lote/editar/:id',
      name: 'editar-animal-lote',
      component: EditarAnimalLote,
    },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
