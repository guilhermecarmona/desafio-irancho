<template>
  <section class="mb-4">
    <div class="row">
      <h2 class="col-md-4 mb-3">Editar Animal</h2>
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
          <label for="id_fazenda">id_fazenda</label>
          <input type="text" id="id_fazenda" name="id_fazenda" placeholder="id_fazenda" v-model="id_fazenda" class="form-control rounded" required />
        </div>
      </div>
      <div class="row px-0">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="no_animal">no_animal</label>
          <input type="text" id="no_animal" name="no_animal" placeholder="no_animal" v-model="no_animal" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="no_raca">no_raca</label>
          <input type="text" id="no_raca" name="no_raca" placeholder="no_raca" v-model="no_raca" class="form-control rounded" required />
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
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="vr_peso">vr_peso</label>
          <input type="text" id="vr_peso" name="vr_peso" placeholder="vr_peso" v-model="vr_peso" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="dt_nascimento">dt_nascimento</label>
          <input type="text" id="dt_nascimento" name="dt_nascimento" placeholder="DD/MM/YYYY" v-model="dt_nascimento" class="form-control rounded" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 px-0 mb-3 form-group">
          <label for="pessoa">pessoa</label>
          <select class="form-control" id="pessoa" v-model="pessoa">
            <option v-for="p in pessoas" :value="p.id">{{p.no_pessoa}}</option>
          </select>
        </div>
      </div>
      <button type="submit" class="mt-4 btn btn-primary" style="margin-left: -15px">Editar animal</button>
    </form>    
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import config from '../../config';

export default {
  name: 'EditarAnimal',
  data(){
    return {
      id: null,
      pessoas: [],
      id_fazenda: null,
      no_animal: null,
      no_raca: null,
      sexo: 'F',
      vr_peso: null,
      dt_nascimento: null,
      pessoa: null,
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

      if (!this.id_fazenda) {
        this.errors.push('O campo id_fazenda é obrigatório.');
      }
      if (!this.no_animal) {
        this.errors.push('O campo no_animal é obrigatório.');
      }
      if (!this.no_raca) {
        this.errors.push('O campo no_raca é obrigatório.');
      }
      if (!this.pessoa) {
        this.errors.push('O campo pessoa é obrigatório.');
      }
      if (!this.vr_peso){
        this.errors.push('O campo vr_peso é obrigatório.');
      }else if(this.vr_peso.replace(/\D/g,'').length === 0){
        this.errors.push('Valor inválido no campo vr_peso.')
      }
      if (!this.dt_nascimento) {
        this.errors.push('O campo dt_nascimento é obrigatório.');
      }else if(!moment(this.dt_nascimento,'DD/MM/YYYY',true).isValid()){
        this.errors.push('Data inválida no campo dt_nascimento.');
      }
      
      if(this.errors.length === 0){
        this.editarAnimal();
      }
    },
    editarAnimal(){
      return axios.put(`${config.urlRest}/animal/${this.id}`,{
          id_fazenda: this.id_fazenda,
          no_animal: this.no_animal,
          no_raca: this.no_raca,
          sexo: this.sexo,
          vr_peso: this.vr_peso.replace(',','.'),
          dt_nascimento: moment(this.dt_nascimento,'DD/MM/YYYY').toISOString(),
          fk_id_pessoa: this.pessoa,
        }).then(() => {
          this.createToast('Animal editado','Animal editado com sucesso','success');
          setTimeout(() => {
            this.voltar();
          },2000);
        }).catch((e) => {
          console.log(e);
          this.createToast('Erro','Erro ao editar animal. Tente novamente mais tarde','danger');
        });
    },
    getData: function (){
      return axios.get(`${config.urlRest}/animal/${this.id}`)
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
        this.id_fazenda = this.dados.id_fazenda;
        this.no_animal = this.dados.no_animal;
        this.no_raca = this.dados.no_raca;
        this.sexo = this.dados.sexo;
        this.vr_peso = this.dados.vr_peso.toString();
        this.dt_nascimento = this.dados.dt_nascimento;
        const pessoaAnimal = this.pessoas.find(p => p.id == this.dados.fk_id_pessoa);
        this.pessoa = pessoaAnimal ? pessoaAnimal.id : null;
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
    return axios.get(`${config.urlRest}/pessoa`).then((resp) => {
      this.pessoas = resp.data;
      this.id = this.$route.params.id;
      this.getData();
    })
  }
}
</script>