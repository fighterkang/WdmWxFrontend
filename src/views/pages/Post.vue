<template lang="html">
  <div class="container">
    <div class="item">
      <input type="text" placeholder="请输入标题" />
    </div>
    <div class="half-x-line"/>
    <div class="item box">
      <div class="box box-item">发布版块</div>
      <div class="box box-y-center box-x-right box-col-flex" @click="toggleBottomSelectFn">
        请选择一级版块<i class="iconfont">&#xe66e;</i>
      </div>
    </div>
    <div class="half-x-line"/>
    <div class="item box">
      <div class="box box-item">发布版块</div>
      <div class="box box-y-center box-x-right box-col-flex" @click="toggleBottomSelectFn">
        请选择二级版块<i class="iconfont">&#xe66e;</i>
      </div>
    </div>
    <div class="half-x-line"/>
    <div class="textarea-container">
      <textarea placeholder="请输入标题"/>
    </div>
    <div class="half-x-line"/>
    <div class="info box box-item">
      图片编辑请到PC端进行，登录www.cnjczh.com
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
  methods: {
    toggleBottomSelectFn() {
      this.$store.dispatch('ToggleBottomSelect', true)
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  .container{
    color: #c0c0c0;
    .item{
      height: 7vh;
      padding:0 4vw;
      font-size: 3.8vw;
      input{
        width: 100%;
        height: 100%;
        font-size: 3.8vw;
      }
      &>div{
        &:nth-child(2) {
          font-size: 3vw;
          .iconfont{
            font-size: 3vw;
            color: #c0c0c0;
          }
        }
      }
    }
    .textarea-container{
      padding:4vw;
      textarea{
        width:100%;
        height: 30vh;
        font-size: 3.2vw;
      }
    }
    .info{
      height: 20vh;
      font-size: 3.2vw;
    }
  }
</style>
