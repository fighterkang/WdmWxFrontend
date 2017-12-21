<template lang="html">
  <div class="layer" v-if="showBottomSelect" @click.self="hide">
    <ul>
      <li class="box box-item active">
        版块一
      </li>
      <li class="box box-item">
        版块二
      </li>
      <li class="box box-item">
        版块三
      </li>
      <li class="box box-item">
        <i class="iconfont">&#xe635;</i>
      </li>
    </ul>
  </div>
</template>

<script>
// import router from '@/router'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      icon: {
        cancel: 'static/icon/cancel.png',
      },
    }
  },
  computed: {
    ...mapState(['showBottomSelect']),
  },
  methods: {
    hide() {
      this.$store.dispatch('ToggleBottomSelect', false)
    },
  },
  created() {
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .layer{
    background: rgba(0,0,0,.4);
    ul{
      width: 70vw;
      margin:0 auto;
      position: absolute;
      left:0;
      right:0;
      bottom:12vh;
      background: white;
      border-radius: 1.5vw;
      overflow: hidden;
      li{
        height: 7vh;
        border-bottom: 1px solid #f1f1f1;
        color: @fontColor2;
        font-size: 4vw;
        .iconfont{
          font-size: 10vw;
          color:@fontColor4;
        }
        &.active{
          background: @activeColor;
          color: white;
        }
      }
    }
    .cancel{
      position: absolute;
      left:0;
      right:0;
      bottom:4vh;
      img{
        width:4.5vh;
      }
      // background: white;
    }
  }
  .half-x-line{
    background: #999;
  }
</style>
