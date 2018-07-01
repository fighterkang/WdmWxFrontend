<template>
  <div class="container">
    <img :src="initData.ico" class="oImg">
    <div class="oTitle">
      {{initData.className}}
    </div>
  </div>
</template>
<script>
  //  import IDetailOne from '../components/IDetailOne'
  export default {
    components: {
//      IDetailOne
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    props: ['initData'],
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 30*@vh 30*@vh 0 30*@vh;
    .oImg {
      width: 100%;
      border-radius: 20*@vh;
    }
    .oTitle {
      font-size: 28*@vh;
      margin-top: 20*@vh;
    }
  }
</style>
