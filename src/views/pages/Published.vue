<template lang="html">
  <div class="container" ref="published">
    <IListOne v-for="i in 10" :key="i">
      <div class="menu box box-y-center box-x-right box-col-flex">
        <img src="static/icon2/ic_reciver.png"/> 10
        <img src="static/icon2/ic_news1.png"/> 10
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
    this.$Helper.overScroll(this.$refs.published)
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    .menu{
      img{
        height: 3.5vw;
        margin-right:1vw;
        margin-left: 3vw;
      }
    }
  }
</style>
