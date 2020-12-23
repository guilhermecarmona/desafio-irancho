<template>
  <section class="mb-4">
    <div class="row">
      <h2 class="col-md-4 mb-3">{{title}}</h2>
      <a class="col-md-3 my-3" href="#">+ Adicionar</a>
    </div>
    <div v-if="!dados || dados.length > 0" class="row">
      <div v-for="d in dados" class="col-md-6 mb-4 card-custom">
        <p v-for="field in fields">
          <b>{{field}}: </b>
          <span>{{d[field]}}</span>
        </p>
        <p class="text-right mb-0">
          <a class="text-primary" href="#" v-on:click="onEdit(d)">Editar</a>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <a class="text-danger" href="#" v-on:click="onDelete(d)">Excluir</a></p>
      </div>      
    </div>
    <p v-else>Nenhum registro encontrado.</p>
  </section>
</template>

<script>
export default {
  name: 'Lista',
  props: ["title","dados"],
  data(){
    return {
      fields: []
    }
  },
  watch: {
    dados: function(){
      if(this.dados.length > 0){
        this.fields = Object.keys(this.dados[0]);   
      }else{
        this.fields = [];
      }
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a,a:hover {
  text-decoration: none;
  cursor: pointer;
}
.card-custom{
  border: 0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 5px 2px #ccc;
}
</style>
