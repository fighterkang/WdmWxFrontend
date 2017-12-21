<template lang="html">
  <div class="container" ref="collect">
    <IListOne v-for="i in 10" :key="i">
      <div class="menu box box-y-center box-x-right box-col-flex">
        <img src="static/icon2/ic_reciver.png"/> 已收藏
      </div>
    </IListOne>
  </div>
</template>
<script>
import IListOne from '../components/IListOne'
export default {
  components: {
    IListOne,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    this.$Helper.overScroll(this.$refs.collect)
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    .btn{
      // background: @activeColor;
      // color: white;
      // height: 3vh;
      // width: 10vw;
      // // font-size: 3vw;
      // border-radius: 3vh;
      margin-right: 2vw;
    }
    .menu{
      font-size: 3.3vw;
      img{
        height: 3.5vw;
        margin-right:1vw;
        margin-left: 3vw;
      }
    }
  }
</style>
