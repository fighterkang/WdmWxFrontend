<template lang='html'>
  <div class='container' ref='forum' @scroll="scrollFn">
    <div class="toper box box-y-center" :style="{ backgroundColor: `rgba(255,255,255, ${ToperOpacity})` }">
      <img src="static/icon2/ic_more.png" @click="toggleMenuFn"/>
      <img src="static/icon2/ic_interfice.png" @click="jumpToSearch"/>
    </div>
    <Slider class="slider" :pages='pages' :sliderinit='sliderinit' @slide='slide' @tap='onTap' @init='onInit'>
      <div slot='loading'>loading...</div>
    </Slider>
    <div class="label box box-y-center">
      <div/>最新帖子
    </div>
    <div class="list-container">
      <IListOne v-for="i in 10" :key="i"/>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Slider from 'vue-concise-slider'
import IListOne from '../components/IListOne'
export default {
  components: {
    Slider,
    IListOne,
  },
  data() {
    return {
      ToperOpacity: 0,
      pages: [],
      sliderinit: {
        currentPage: 0,
        autoplay: 3000,
        loop: true,
        direction: 'horizontal',
        infinite: 1,
        slidesToScroll: 1,
        timingFunction: 'ease',
        duration: 300,
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    slide(data) {
      console.log(data)
    },
    onTap(data) {
      console.log(data)
    },
    onInit(data) {
      console.log(data)
    },
    scrollFn(e) {
      let scrollTop = e.target.scrollTop
      this.ToperOpacity = scrollTop / 200
    },
    toggleMenuFn() {
      this.$store.dispatch('ToggleIMenuData', { show: true })
    },
    jumpToSearch() {
      this.$Helper.jumpPage({name: 'Search'}, this)
    },
  },
  created() {
    this.$store.dispatch('ToggleBar', true)
    this.pages = _.map(this.$Helper.requireAll(require.context(`../../../static/slider`, true, /\.jpg$/)), item => (
      {
        html: `<img src="${item}" style="width: 100%;height: 100%"/>`,
        style: {
          background: '#1bbc9b',
        },
      }
    ))
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.forum)
  },
}
</script>

<style lang='less' scoped>
.container {
  background: #f1f1f1;
  overflow-x: hidden;
  overflow-y: auto;
  .toper{
    position: fixed;
    top:0;
    left:0;
    right:0;
    height: 7vh;
    // background: rgba(255,255,255,0.1);
    z-index: 1;
    padding:0 3vw;
    &>img{
      &:nth-child(1) {
        height: 32%;
        margin-right: 82vw;
      }
      &:nth-child(2) {
        height: 40%;
      }
    }
  }
  .slider{
    height: 26vh;
    opacity: 0.9;
    position: relative;
    z-index: 0;
  }
  .label{
    height: 7vh;
    font-size: 4.2vw;
    padding: 0 3vw;
    font-weight: 500;
    background: white;
    &>div{
      height:2vh;
      width:0.7vh;
      background: #23ae92;
      margin-right:1vw;
    }
  }
  .list-container{
    margin-top:1vh;
  }
}
</style>
