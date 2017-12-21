<template lang="html">
  <div class="s-container">
    <div class="head box">
      <div class="box box-y-center">
        <img src="static/head.jpg">angel
      </div>
      <div class="box box-y-center box-col-flex box-x-right">
        <slot></slot>
      </div>
    </div>
    <div class="content">
      如果孩子想干嘛就干嘛，还要父母做什么？如果孩子想干嘛就干嘛，还要父母做什么？
    </div>
    <div class="bottom box box-y-center box-x-right">
      回复
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .s-container{
    background: white;
    padding:3vw;
    margin-bottom:1vh;
    .head{
      height: 7vh;
      &>div{
        height: 100%;
        font-size: 3vw;
        img{
          height: 5.5vh;
          width: 5.5vh;
          border-radius: 5.5vh;
          margin-right:2vw;
        }
      }
    }
    .content{
      font-size: 3.2vw;
      color: @fontColor3;
      padding: 1vw;
    }
    .bottom{
      font-size: 3vw;
      color: @fontColor4;
    }
  }
</style>
