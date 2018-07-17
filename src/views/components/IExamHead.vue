<template>
  <div class="container">
    <span class="backFlag" @click="goBack"><</span>
    <span class="examTitle">{{examHeadInfoTitle}}</span>
    <span class="vipInfo">{{examHeadInfoVipTime || '会员充值'}}</span>
  </div>
</template>
<script>
  //  import IDetailOne from '../components/IDetailOne'
  import {mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState(['examHeadInfoTitle', 'examHeadInfoVipTime']),
    },
    watch: {},
    methods: {
      goBack() {
//        history.back(-1)
        this.$router.back(-1)
      },
    },
    created() {
    },
    mounted() {
      console.log('this.$router')
      console.log(this.$router)
      console.log('history')
      console.log(history)
    },
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100*@vh;
    background: #12af92;
    color: #fff;
    padding: 0 30*@vh;
    display: flex;
    justify-content: space-between;
    .backFlag {
      font-size: 60*@vh;
      line-height: 100*@vh;
      width: 128*@vh;
    }
    .examTitle {
      font-size: 34*@vh;
      line-height: 100*@vh;
    }
    .vipInfo {
      font-size: 32*@vh;
      line-height: 100*@vh;
    }
  }
</style>
