<template lang="html">
  <div class="container" ref="search">
    <div class="input-container box box-item">
      <i class="iconfont">&#xe60b;</i>
      <input type="text" class="box-col-flex" placeholder="搜索"/>
      <div>取消</div>
    </div>
    <div class="result">
      <IListOne v-for="i in 10" :key="i"/>
    </div>
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
  created() {
    this.$store.dispatch('ToggleBar', false)
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.search)
  },
}
</script>

<style lang="less" scoped>
  @import '../../theme/index.less';
  .container{
    background: #fcfcfc;
    overflow-x: hidden;
    overflow-y: auto;
    .input-container{
      height: 10vh;
      padding: 0 2vw;
      // border:1px solid red;
      &>.iconfont{
        color: @fontColor4;
        position: absolute;
        left:4vw;
      }
      &>input{
        border: none;
        box-shadow: none;
        background: white;
        outline: none;
        height: 4.5vh;
        padding: 1vh 7vw;
        font-size: 4vw;
        border-radius: 1vh;
      }
      &>div{
        padding: 0 2vw;
        font-size: 3.8vw;
        color: @activeColor;
      }
    }
  }
</style>
