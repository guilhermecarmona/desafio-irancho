<template>
  <section class="mb-4">
    <div class="row">
      <h2 class="col-md-4 mb-3">Editar Pessoa</h2>
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
          <label for="no_pessoa">no_pessoa</label>
          <input type="text" id="no_pessoa" name="no_pessoa" placeholder="no_pessoa" v-model="no_pessoa" class="form-control rounded" required />
        </div>
      </div>
      <div class="row px-0">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="no_email">no_email</label>
          <input type="text" id="no_email" name="no_email" placeholder="no_email" v-model="no_email" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="no_pessoa">no_pessoa</label>
          <input type="text" id="endereco" name="endereco" placeholder="endereco" v-model="endereco" class="form-control rounded" required />
        </div>
      </div>
      <div>
        <div class="row">
          <p class="my-1">sexo</p>
        </div>
        <div class="row form-group">
          <div class="col-md-6 px-0 mb-3 form-check form-check-inline">
            <label for="sexo" class="form-check-label mr-1">F</label>
            <input type="radio" id="sexo" name="sexo" placeholder="sexo" v-model="sexo" value="F" class="mr-3"/>
            <label for="sexo" class="form-check-label mr-1">M</label>
            <input type="radio" id="sexo" name="sexo" placeholder="sexo" v-model="sexo" value="M" class="mr-3"/>        
          </div>        
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group form-check">
          <label for="ic_ativo" class="form-check-label mr-3">ic_ativo</label>
          <input type="checkbox" id="ic_ativo" name="ic_ativo" placeholder="ic_ativo" v-model="ic_ativo" />
        </div>
      </div>
      <button type="submit" class="mt-4 btn btn-primary" style="margin-left: -15px">Editar pessoa</button>
    </form>    
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';

export default {
  name: 'EditarPessoa',
  data(){
    return {
      id: null,
      no_pessoa: null,
      no_email: null,
      endereco: null,
      sexo: 'F',
      ic_ativo: true,
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

      if (!this.no_pessoa) {
        this.errors.push('O campo no_pessoa é obrigatório.');
      }
      if (!this.no_email) {
        this.errors.push('O campo no_email é obrigatório.');
      }
      if (!this.endereco) {
        this.errors.push('O campo endereco é obrigatório.');
      }
      
      if(this.errors.length === 0){
        this.editarPessoa();
      }
    },
    editarPessoa(){
      return axios.put(`${config.urlRest}/pessoa/${this.id}`,{
          no_pessoa: this.no_pessoa,
          no_email: this.no_email,
          endereco: this.endereco,
          sexo: this.sexo,
          ic_ativo: this.ic_ativo
        }).then(() => {
          this.createToast('Pessoa editada','Pessoa editada com sucesso','success');
          setTimeout(() => {
            this.voltar();
          },2000);
        }).catch((e) => {
          console.log(e);
          this.createToast('Erro','Erro ao editar pessoa. Tente novamente mais tarde','danger');
        });
    },
    getData: function (){
      return axios.get(`${config.urlRest}/pessoa/${this.id}`)
      .then((resp) => {
        let object = {};
        for(const field of Object.keys(resp.data)){
          if(field.includes('dt_')) {
            object[field] = this.getDataFormatada(resp.data[field]);
          }else{
            object[field] = resp.data[field];
          }
        }
        this.dados = {...object};
        this.no_pessoa = this.dados.no_pessoa;
        this.no_email = this.dados.no_email;
        this.endereco = this.dados.endereco;
        this.sexo = this.dados.sexo;
        this.ic_ativo = this.dados.ic_ativo;
      })
      .catch(e => {
        console.log(e);
      });
    },
    getDataFormatada(value) {
      return moment(value).format('DD/MM/YYYY');
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
    this.id = this.$route.params.id;
    this.getData();
  }
}
</script>