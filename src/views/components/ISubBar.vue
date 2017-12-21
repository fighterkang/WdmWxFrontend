<template lang="html">
  <div class="container box">
    <div class="subbar-item box-col-flex" :class="{active:activeIcon===item.handle}" v-for="(item, key) in subArr" :key="key" @click="choseItem(item.handle)" @touchmove.stop="touchmove">
      <!-- <i class="iconfont" v-html="item.icon"/> -->
      <img :src="getImage(item.handle)" v-if="activeIcon!==item.handle">
      <img :src="getImage(item.handle,true)" v-else>
      <div>{{item.text}}</div>
    </div>
    <!--<div class="subbar-item box-col-flex">
      <i class="iconfont">&#xe650;</i>
      <div>比赛</div>
    </div>
    <div class="subbar-item box-col-flex">
      <i class="iconfont">&#xe650;</i>
      <div>发帖</div>
    </div>
    <div class="subbar-item box-col-flex">
      <i class="iconfont">&#xe600;</i>
      <div>我的</div>
    </div>-->
  </div>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
// import _ from 'lodash'
export default {
  data() {
    return {
      subArr: [
        {
          // icon: '&#xe603;',
          text: '首页',
          handle: 'Home',
        },
        {
          // icon: '&#xe650;',
          text: '听课',
          handle: 'Study',
        },
        {
          // icon: '&#xe606;',
          text: '论坛',
          handle: 'Forum',
        },
        {
          // icon: '&#xe600;',
          text: '活动',
          handle: 'Activity',
        },
        {
          // icon: '&#xe600;',
          text: '我的',
          handle: 'Mine',
        },
      ],
      // activeIcon: 'ExchangeList',
    }
  },
  computed: {
    ...mapState('basic', ['basic']),
    activeIcon() {
      return this.$route.name
    },
  },
  methods: {
    choseItem(name) {
      if (name === 'Mine' && this.basic.power === -1) {
        this.$Helper.message.toast({
          text: '您还未验证，请先完善您的基本信息',
          long: 2000,
        })
        name = 'Setting'
      }
      if (name === 'Post') {
        this.$store.dispatch('ToggleBottomSelect', true)
      } else {
        // router.push({ name })
        this.$Helper.jumpPage(name, this)
      }
    },
    test() {
      this.$Helper.message.comfirm({
        text: '12345657',
        show: true,
      })
    },
    touchmove(e) {
      e.preventDefault()
    },
    getImage(name, active) {
      return `static/icon2/sub_${name}${active ? '_active' : ''}.png`
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8vh;
  border-top: 1px solid #eee;
  background: #fbfbfb;
}

.subbar-item {
  color: #8a8a8a;
  padding-top: .7vh;
  text-align: center;
}

.subbar-item.active {
  color: @activeFontColor;
}
.subbar-item{
  img{
    height:5vw;
    margin:.6vh 0;
  }
}

.subbar-item>i {
  font-size: 6.2vw;
  font-weight:300;
  position: relative;
  top:-.2vw;
}

.subbar-item>div {
  font-size: 2.5vw;
  position: relative;
  top:-0.9vw;
  font-weight:300; 
}
</style>
