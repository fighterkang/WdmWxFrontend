<template lang="html">
  <div class="container" ref="home">
    <IHomeLand v-for="i in 10" :key="i"/>
  </div>
</template>
<script>
import IHomeLand from '../components/IHomeLand'
export default {
  components: {
    IHomeLand,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    this.$Helper.overScroll(this.$refs.home)
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
