<template>
  <div>
    <section class="mb-4">
      <div class="row">
        <h2 class="col-md-4 mb-5">Animal x Lote</h2>
        <router-link to="animal-lote/criar" class="col-md-3 my-3">+ Adicionar</router-link>
      </div>
      <div v-if="!dados || dados.length > 0" class="row">
        <div v-for="d in dados" class="col-md-5 mr-4 mb-4 card-custom">
          <p v-for="field in fields">
            <b>{{field}}: </b>
            <span>{{d[field]}}</span>
          </p>
          <p class="text-right mb-0">
            <router-link :to="{name: 'editar-animal-lote', params: {id:d.id}}" class="text-primary" v-on:click="onEdit(d)">Editar</router-link>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <a class="text-danger" v-on:click="onDelete(d)">Excluir</a></p>
        </div>      
      </div>
      <p v-else>Nenhum registro encontrado.</p>
    </section>
    <Modal v-bind:type="'animal-lote'" v-bind:modalShow="modalShow" 
      v-on:delete-animal-lote="onDeleteConfirm" v-on:cancel-delete-animal-lote="modalShow = false"/>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';
import Modal from '../shared/Modal';

export default {
  name: 'AnimalLote',
  components: { Modal },  
  data(){
    return {
      modalShow: false,
      fields: [],
      dados: [],
      id: null,
    }
  },
  watch: {
    dados: function(){
      if(this.dados.length > 0){
        this.fields = Object.keys(this.dados[0]);
        this.fields = this.fields.filter(field => field != 'id' && field != 'fk_id_animal' && field != 'fk_id_lote');
      }else{
        this.fields = [];
      }
    }
  },
  methods: {
    getData: async function (){
      return axios.get(`${config.urlRest}/animal-lote`)
      .then((resp) => {
        this.dados = resp.data.map(dado => {
          let object = {};
          for(const field of Object.keys(dado)){
            if(field.includes('dt_')) {
              object[field] = this.getDataFormatada(dado[field]);
            }else if(field === 'animal'){
              object[field] = dado[field].no_animal;
            }else if(field === 'animal_lote'){
              object[field] = dado[field].no_lote;
            }else{
              object[field] = dado[field];
            }
          }
          return object;
        });
      })
      .catch(e => {
        console.log(e);
      });
    },
    getDataFormatada(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    onDelete(d){
      this.modalShow = true;
      this.id = d.id;
    },
    onDeleteConfirm(){
      return axios.delete(`${config.urlRest}/animal-lote/${this.id}`)
        .then(() => {
          this.getData();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
.card-custom{
  border: 0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 5px 2px #ccc;
}
</style>
