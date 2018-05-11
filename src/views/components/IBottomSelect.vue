<template lang="html">
  <div class="container" @click="hide">
    <div class="layer" v-if="showBottomSelect"/>
    <ul :class="{ active: showBottomSelect }">
      <div class="scroll-ul" ref="scroll_ul">
        <li class="box box-item" v-for="(item, key) in classIdList" :key="key" @click="choseLi(item)">
          {{ item.consultClassName }}
        </li>
      </div>
      <li class="box box-item cancel active">
        <img src="static/icon/cancel.png">
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
      classIdList: [],
    }
  },
  computed: {
    ...mapState(['showBottomSelect']),
    ...mapState('basic', [
      'basic',
    ]),
  },
  methods: {
    hide() {
      this.$store.dispatch('ToggleBottomSelect', false)
    },
    choseLi(item) {
      this.$Helper.emitAction('choseSelect', item)
    },
  },
  created() {
    this.$Helper.ajax({
      url: 'WeOpen.ConsultClassList',
      urlType: 'bbs',
      method: 'GET',
    }).then(
      ({data}) => {
        this.classIdList = data.data
      },
    )
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.scroll_ul)
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    .layer{
      background: rgba(0,0,0,0.3)
    }
    ul{
      z-index: 110;
      width: 70vw;
      margin:0 auto;
      position: absolute;
      left:0;
      right:0;
      bottom: -100vh;
      opacity: 0.3;
      border-radius: 1.5vw;
      transition: all 400ms cubic-bezier(.5, 0, .1, 1);
      overflow: hidden;
      &.active{
        bottom: 8vh;
        opacity: 1;
      }
      .scroll-ul{
        max-height:41vh;
        overflow-x: hidden;
        overflow-y: auto;
        background: white;
      }
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
        &.cancel{
          border: none;
          img{
            width:4vh;
          }
        }
      }
    }
  }
  .half-x-line{
    background: #999;
  }
</style>
