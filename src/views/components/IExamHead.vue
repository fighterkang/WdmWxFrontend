<template>
  <div class="container">
    <div class="backFlag"><</div>
    <div class="examTitle">{{examHeadInfo.title}}</div>
    <div class="vipInfo">{{examHeadInfo.vipTime || '请充值会员'}}</div>
  </div>
</template>
<script>
  //  import IDetailOne from '../components/IDetailOne'
  import { mapState } from 'vuex'
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState(['examHeadInfo']),
    },
    watch: {},
    methods: {},
    created() {},
    mounted() {
      console.log(mapState(['examHeadInfo']))
    },
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100*@vh;
    background: #12af92;
    color: #fff;
    padding: 0 30*@vh;
    .backFlag {
      font-size: 60*@vh;
      line-height: 100*@vh;
    }
  }
</style>
