<template lang="html">
  <div class="container" ref="reply">
    <IListOne v-for="i in 10" :key="i">
      <div class="menu box box-y-center box-x-right box-col-flex">
        <div class="btn box box-item">回复</div>
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
    this.$Helper.overScroll(this.$refs.reply)
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
  }
</style>
