<template>
  <section class="mb-4">
    <div class="row">
      <h2 class="col-md-4 mb-3">Criar Lote</h2>
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
          <label for="no_lote">no_lote</label>
          <input type="text" id="no_lote" name="no_lote" placeholder="no_lote" v-model="no_lote" class="form-control rounded" required />
        </div>
      </div>
      <div class="row px-0">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="ds_lote">ds_lote</label>
          <input type="text" id="ds_lote" name="ds_lote" placeholder="ds_lote" v-model="ds_lote" class="form-control rounded" required />
        </div>
      </div>      
      <button type="submit" class="mt-4 btn btn-primary" style="margin-left: -15px">Criar lote</button>
    </form>    
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';

export default {
  name: 'CriarLote',
  data(){
    return {
      no_lote: null,
      ds_lote: null,
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

      if (!this.no_lote) {
        this.errors.push('O campo no_lote é obrigatório.');
      }
      if (!this.ds_lote) {
        this.errors.push('O campo ds_lote é obrigatório.');
      }
      
      if(this.errors.length === 0){
        this.criarLote();
      }
    },
    criarLote(){
      return axios.post(`${config.urlRest}/lote`,{
          no_lote: this.no_lote,
          ds_lote: this.ds_lote,
        }).then(() => {
          this.createToast('Lote criado','Lote criado com sucesso','success');
          setTimeout(() => {
            this.voltar();
          },2000);
        }).catch((e) => {
          console.log(e);
          this.createToast('Erro','Erro ao criar lote. Tente novamente mais tarde','danger');
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
  }
}
</script>