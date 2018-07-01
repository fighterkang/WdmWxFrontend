<template>
  <div class="container">
    <IExamHead/>
    <IExamBody v-for="(item, key) in listData" :initData="item" :key="key"/>
  </div>
</template>
<script>
  import IExamHead from '../components/IExamHead'
  import IExamBody from '../components/IExamBody'
  export default {
    components: {
      IExamHead,
      IExamBody,
    },
    data() {
      return {
        listData: [],
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
      this.$Helper.ajax({
        url: 'open/examCenter/getOneClass',
        method: 'GET',
//        params: { phone: this.rigster.phone },
      }).then(
        (res) => {
          this.listData = res.data
        },
        () => {}
      )
    },
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
