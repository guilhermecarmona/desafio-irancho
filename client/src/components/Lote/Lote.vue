<template>
  <div>
    <section class="mb-4">
      <div class="row">
        <h2 class="col-md-4 mb-5">Lote</h2>
        <router-link to="lote/criar" class="col-md-3 my-3">+ Adicionar</router-link>
      </div>
      <div v-if="!dados || dados.length > 0" class="row">
        <div v-for="d in dados" class="col-md-5 mr-4 mb-4 card-custom">
          <p v-for="field in fields">
            <b>{{field}}: </b>
            <span>{{d[field]}}</span>
          </p>
          <p class="text-right mb-0">
            <router-link :to="{name: 'editar-lote', params: {id:d.id}}" class="text-primary" v-on:click="onEdit(d)">Editar</router-link>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <a class="text-danger" v-on:click="onDelete(d)">Excluir</a></p>
        </div>      
      </div>
      <p v-else>Nenhum registro encontrado.</p>
    </section>
    <Modal v-bind:type="'lote'" v-bind:modalShow="modalShow" 
      v-on:delete-lote="onDeleteConfirm" v-on:cancel-delete-lote="modalShow = false"/>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';
import Modal from '../shared/Modal';

export default {
  name: 'Lote',
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
        this.fields = this.fields.filter(field => field != 'id' && field != 'fk_id_pessoa');
      }else{
        this.fields = [];
      }
    }
  },
  methods: {
    getData: async function (){
      return axios.get(`${config.urlRest}/lote`)
      .then((resp) => {
        this.dados = resp.data.map(dado => {
          let object = {};
          for(const field of Object.keys(dado)){
            if(field.includes('dt_')) {
              object[field] = this.getDataFormatada(dado[field]);
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
      return axios.delete(`${config.urlRest}/lote/${this.id}`)
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
