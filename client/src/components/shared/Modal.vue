<template>
  <b-modal
    cancel-title="Não"
    centered
    title="Excluir registro"
    size="sm"
    v-model="localModalShow"
    ok-title="Sim"
    class="text-dark w-50 float-left"
    @cancel="$emit(`cancel-delete-${type}`)"
    @ok="$emit(`delete-${type}`)">
      Tem certeza que deseja excluir esse registro?
  </b-modal>
</template>

<script>
import { BModal, VBModal } from 'bootstrap-vue';

export default {
  name: 'Modal',
  components: { BModal },
  directives: { 'b-modal': VBModal },
  props: ["type","modalShow"],  
  data() {
    return {
      localModalShow: false,
    }
  }, 
  watch: {
    modalShow: function(val){
      this.localModalShow = val;
    }
  }
}
</script>