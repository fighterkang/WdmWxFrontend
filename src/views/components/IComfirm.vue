<template lang="html">
  <transition name="fade">
    <div class="layer container" v-if="show" @click.self="cancel">
      <div class="comfirm-container">
        <div class="text box box-item">
          <img :src="icon.smile" v-for="i in 3">
          <!-- {{ text }} -->
          删除可就没有喽~
        </div>
        <!-- <div class="half-x-line"></div> -->
        <div class="btn-container box box-item">
          <IButton @clickFn="cancel">取消</IButton>
          <IButton type="primary" @clickFn="comfirm">确认</IButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
import IButton from './IButton'
export default {
  components: {
    IButton,
  },
  data() {
    return {
      icon: {
        smile: 'static/icon/smile.png',
      },
    }
  },
  computed: {
    ...mapState('icomfirm', [
      'text',
      'lFn',
      'rFn',
      'show',
    ]),
  },
  methods: {
    comfirm() {
      this.lFn()
      // this.lFn.apply(this)
      this.$Helper.message.comfirm({show: false})
    },
    cancel() {
      this.rFn()
      // this.rFn.apply(this)
      this.$Helper.message.comfirm({show: false})
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.container {
  // background: none;
  transition: all .1s linear;
  padding-top:28vh;
}

.comfirm-container{
  background: white;
  // height:26vh;
  border-radius: 1vw;
  width:76vw;
  margin:0 auto;
  .text{
    padding:14vw 5vw 10vw 5vw;
    color:#121212;
    text-align: center;
    font-size: 4.5vw;
    img{
      height:6vw;
      margin-right:.2vw;
    }
    img:nth-child(3) {
      margin-right:2vw;
    }
  }
  .btn-container{
    padding-bottom:2vh;
    .btn{
      margin: 3vw;
    }
  }
}
.half-y-line{
  height:6vh;
  background: #aaa;
}
.half-x-line{
  background: #aaa;
}
</style>
