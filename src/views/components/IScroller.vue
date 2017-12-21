<template lang="html">
  <div class="scroll-container">
    <div v-show="!empty">
      <div v-if="scroll.top" :style="{height: touching ? '' : scroll.top + 26 + 'px'}"></div>
      <slot></slot>
    </div> 
    <div class="empty-status" v-show="empty">
      <img :src="this.emptyIcon || icon.upvote">
      <p>{{ empty }}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import JRoll from 'jroll'
import _ from 'lodash'
// import { mapState } from 'vuex'
// 15820786955
export default {
  components: {
  },
  data() {
    return {
      scroll: {
        top: null,
        Timer: null,
      },
      Scroller: null,
      touching: false,
      icon: {
        upvote: 'static/icon/upvote.png',
      },
    }
  },
  props: {
    refresh: Function,
    infinite: Function,
    empty: {
      type: String,
    },
    emptyIcon: {
      type: String,
    },
  },
  computed: {
    canNotFillHeight() {
      return _.get(this, 'Scroller.maxScrollY') === 0
    },
  },
  methods: {
    initScroll() {
      // console.log('initScroll')
      this.Scroller = new JRoll('.scroll-container', {
        scrollY: true,
        scrollX: false,
      })
      this.Scroller.on('scroll', () => {
        this.touching = true
        if (this.refresh && this.Scroller.y > 40) {
          if (this.scroll.Timer) clearInterval(this.scroll.Timer)
          this.scroll.top = (this.Scroller.y - 10) * Math.abs(260 - this.Scroller.y) / 240
          this.$store.dispatch('ToggleIwaitData', { show: true, top: this.scroll.top })
        }
      })
      this.Scroller.on('scrollEnd', () => {
        this.touching = false
        if (this.refresh && this.scroll.top > 29) {
          if (this.refresh) this.refresh()
          this.scroll.Timer = setTimeout(() => {
            this.scroll.Timer = setInterval(() => {
              this.scroll.top = this.scroll.top - 10
              this.$store.dispatch('ToggleIwaitData', { show: this.scroll.top > 0, top: this.scroll.top > 0 ? this.scroll.top : 0 })
              if (this.scroll.top <= 0) {
                this.scroll.top = null
                clearInterval(this.scroll.Timer)
                this.$Helper.message.toast({ text: '已刷新列表', long: 2000 })
              }
            }, 50)
          }, 1500)
        }
        if (this.infinite && this.Scroller.maxScrollY !== 0 && this.Scroller.y === this.Scroller.maxScrollY) {
          if (this.infinite) this.infinite()
        }
      })
    },
    refreshScroll() {
      Vue.nextTick(() => {
        setTimeout(() => {
          // console.log('refreshScroll')
          this.Scroller.refresh()
        }, 100)
      })
    },
    scrollTo(data = 0) {
      // Vue.nextTick(() => {
      //   setTimeout(() => {
      //     this.Scroller.scrollTo(0, parseInt(data))
      //   }, 0)
      // })
      this.Scroller.on('refresh', () => {
        setTimeout(() => {
          this.Scroller.scrollTo(0, parseInt(data))
        }, 0)
      })
    },
    getScrollPosition() {
      return this.Scroller.y
    },
  },
  mounted() {
    this.initScroll()
    // console.log(this.empty)
  },
  beforeDestroy() {
    // this.Scroller.destroy()
  },
}
</script>

<style lang="less" scoped>
@import "../../theme/index.less";
.scroll-container {
  background: #f3f3f3;
  >div{
    padding-bottom: 1vh;
  }
  .empty-status {
    height: 100%;
    background: #fff;
    text-align: center;
    img {
      width: 20%;
      margin: 14vh auto 4vh auto;
    }
    p {
      font-size: 4vw;
      color: @basicFontColor;
    }
  }
}

.load-more {
  height: 10vw;
  font-size: 4vw;
  color: #2c3e50;
}

.load-more.middle {
  margin-top: 30vh;
}
</style>
