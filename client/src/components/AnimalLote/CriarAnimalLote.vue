<template>
  <section class="mb-4">
    <div class="row">
      <h2 class="col-md-4 mb-3">Criar Animal x Lote</h2>
      <a class="col-md-3 my-3" href="#" @click="voltar">< Voltar</a>
    </div>
    <p v-if="errors.length" class="text-danger">
      <b>Por favor, revise o(s) problema(s) abaixo: </b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    <form class="container mt-3" @submit="checkForm" novalidate="true"> 
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="animal">animal</label>
          <select class="form-control" id="animal" v-model="animal">
            <option v-for="p in animais" :value="p.id">{{p.no_animal}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="lote">lote</label>
          <select class="form-control" id="lote" v-model="lote">
            <option v-for="p in lotes" :value="p.id">{{p.no_lote}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="dt_entrada">dt_entrada</label>
          <input type="text" id="dt_entrada" name="dt_entrada" placeholder="dt_entrada" v-model="dt_entrada" class="form-control rounded" required />
        </div>
      </div>
      <div class="row px-0">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="dt_saida">dt_saida</label>
          <input type="text" id="dt_saida" name="dt_saida" placeholder="dt_saida" v-model="dt_saida" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="dt_ultima_movimentacao">dt_ultima_movimentacao</label>
          <input type="text" id="dt_ultima_movimentacao" name="dt_ultima_movimentacao" placeholder="dt_ultima_movimentacao" v-model="dt_ultima_movimentacao" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group form-check">
          <label for="ic_bezerro" class="form-check-label mr-3">ic_bezerro</label>
          <input type="checkbox" id="ic_bezerro" name="ic_bezerro" placeholder="ic_bezerro" v-model="ic_bezerro" />
        </div>
      </div>
      <button type="submit" class="mt-4 btn btn-primary" style="margin-left: -15px">Criar animal x lote</button>
    </form>    
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';

export default {
  name: 'CriarAnimal',
  data(){
    return {
      animais: [],
      lotes: [],
      dt_entrada: null,
      dt_saida: null,
      dt_ultima_movimentacao: null,
      ic_bezerro: false,
      animal: null,
      lote: null,
      errors: [],
    }
  },
  methods: {
    voltar() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    checkForm: function (e) {
      e.preventDefault();
      this.errors = [];

      if (!this.animal) {
        this.errors.push('O campo animal é obrigatório.');
      }
      if (!this.lote) {
        this.errors.push('O campo lote é obrigatório.');
      }      
      if (!this.dt_entrada) {
        this.errors.push('O campo dt_entrada é obrigatório.');
      }else if(!moment(this.dt_entrada,'DD/MM/YYYY',true).isValid()){
        this.errors.push('Data inválida no campo dt_entrada.');
      }
      if (!this.dt_saida) {
        this.errors.push('O campo dt_saida é obrigatório.');
      }else if(!moment(this.dt_saida,'DD/MM/YYYY',true).isValid()){
        this.errors.push('Data inválida no campo dt_saida.');
      }
      if (!this.dt_ultima_movimentacao) {
        this.errors.push('O campo dt_ultima_movimentacao é obrigatório.');
      }else if(!moment(this.dt_ultima_movimentacao,'DD/MM/YYYY',true).isValid()){
        this.errors.push('Data inválida no campo dt_ultima_movimentacao.');
      }
      
      if(this.errors.length === 0){
        this.criarAnimalLote();
      }
    },
    criarAnimalLote(){
      return axios.post(`${config.urlRest}/animal-lote`,{
          dt_entrada: moment(this.dt_entrada,'DD/MM/YYYY').toISOString(),
          dt_saida: moment(this.dt_saida,'DD/MM/YYYY').toISOString(),
          dt_ultima_movimentacao: moment(this.dt_ultima_movimentacao,'DD/MM/YYYY').toISOString(),
          ic_bezerro: this.ic_bezerro,
          fk_id_animal: this.animal,
          fk_id_lote: this.lote,
        }).then(() => {
          this.createToast('Animal x Lote criado','Animal x Lote criado com sucesso','success');
          setTimeout(() => {
            this.voltar();
          },2000);
        }).catch((e) => {
          console.log(e);
          this.createToast('Erro','Erro ao criar animal x lote. Tente novamente mais tarde','danger');
        });
    },
    createToast(title,msg,type){
      this.$bvToast.toast(msg, {
        title,
        autoHideDelay: 2000,
        variant: type,
        appendToast: false,
        solid: true,
      })
    }
  },
  created(){
    return axios.get(`${config.urlRest}/animal`).then((resp) => {
      this.animais = resp.data;
      axios.get(`${config.urlRest}/lote`).then((respLotes) => {
        this.lotes = respLotes.data;
      });
    });
  }
}
</script>