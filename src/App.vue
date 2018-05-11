<template>
  <div id='app'>
    <transition :name="transitionName">
      <router-view class='router-view' v-if="basicDataInitOver" v-wechat-title="$route.meta.title" img-set="static/logo2.png"></router-view>
    </transition>
    <IToast/>
    <IEntry/>
    <!-- <IMenu/> -->
    <IBottomSelect/>
    <ILoading/>
    <!--<audio  name="media" loop="loop" id="bg_music"><source src="" type="audio/mpeg"></audio>-->
  </div>
</template>

<script>
import IBottomSelect from './views/components/IBottomSelect'
import IToast from './views/components/IToast'
import IEntry from './views/components/IEntry'
import IPrompt from './views/components/IPrompt'
// import IMenu from './views/components/IMenu'
import ILoading from './views/components/ILoading'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    IToast,
    IEntry,
    IPrompt,
    // IMenu,
    IBottomSelect,
    ILoading,
  },
  data() {
    return {
      transitionName: 'fade',
      basicDataInitOver: true,
      Timer: null,
    }
  },
  watch: {
    '$route'(to, from) {
      let toDeep = this.$Helper.getRouteIndex(to.name)
      let fromDeep = this.$Helper.getRouteIndex(from.name)
      this.transitionName = toDeep > fromDeep ? 'slide-left' : (toDeep < fromDeep ? 'slide-right' : 'fade')
      // reset page share
      if (['Login', 'Share', 'PostDetail', 'ShareActivity', 'ShareLesson'].indexOf(to.name) === -1) this.loadWx()
    },
  },
  computed: {
    ...mapState('basic', [
      'basic',
    ]),
    showBar() {
      return this.$store.state.showBar
    },
  },
  created() {
    // judge is pc or phone
    this.$Helper.judgeDevice()
    // test basic cookie
    let basicCookie = JSON.parse(this.$Helper.getCookie('basic') || '{}')
    this.$Helper.setCookie('basic', basicCookie)
    // load wx
    if (['PostDetail', 'ShareActivity', 'ShareLesson'].indexOf(this.$route.name) === -1) this.loadWx()
  },
  methods: {
    loadWx() {
      // load wx
      this.$Helper.loadWx().then(
        () => {
          console.log('success')
          this.$Helper.resetWxShare({title: '显百教育', desc: '让孩子随时随地享受优质的教育资源和服务', link: 'http://abc.cnjczh.com/phone', imgUrl: 'http://img.cnjczh.com/post_94_1522400716391'})
        },
        () => {
          console.log('error')
        }
      )
    },
  },
  beforeDestroy() {
    console.log('KO')
    this.$Helper.clearCookie()
  },
}
</script>

<style lang="less">
/*定义基础类*/

*,
body,
p {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont,"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  font-weight: 400;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

// @font-face {
//   font-family: 'iconfont';  /* project id 516840 */
//   src: url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.eot');
//   src: url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.eot?#iefix') format('embedded-opentype'),
//   url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.woff') format('woff'),
//   url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.ttf') format('truetype'),
//   url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.svg#iconfont') format('svg');
// }

@font-face {
  font-family: 'iconfont';  /* project id 516840 */
  src: url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.eot');
  src: url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.woff') format('woff'),
  url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_516840_97f9tojt8ajrlik9.svg#iconfont') format('svg');
}

#app {
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  position: relative;
}

.router-view {
  /*transition: all .5s cubic-bezier(.55, 0, .1, 1);*/
  transition: all 400ms cubic-bezier(.55, 0, .1, 1);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.router-view.showBar {
  height: 92vh;
}

input, textarea{
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  resize: none;
}

::-webkit-input-placeholder {
  color: #c0c0c0;
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

// .box{
//   display: flex;
//   flex-wrap: nowrap;     //默认不换行
// }

// .box-wrap{
//   flex-wrap: wrap
// }

// .box-x-left{
//   justify-content: flex-start;
// }

// .box-x-center{
//   justify-content: center;
// }

// .box-x-right{
//   justify-content: flex-end;
// }

// .box-y-top{
//   align-items: flex-start;
// }

// .box-y-center{
//   align-items: center;
// }

// .box-y-bottom{
//    align-items: flex-end;
// }

// .box-item{
//   justify-content: center;
//   align-items: center;
// }

// .box-col-flex{
//   flex-grow: 1;
//   flex-shrink: 0;
//   flex-basis: 1px;
//   width: 1px;
// }

// .box-row-flex{
//   flex-grow: 1;
//   flex-shrink: 0;
//   flex-basis: 1px;
//   height: 1px;
// }

.box {
  display: -webkit-box;
  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box;
  /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox;
  /* 混合版本语法: IE 10 */
  display: -webkit-flex;
  /* 新版本语法: Chrome 21+ */
  display: flex;
  /* 新版本语法: Opera 12.1, Firefox 22+ */

  // 默认水平布局
  -moz-box-orient: horizontal; /*Firefox*/
  -webkit-box-orient: horizontal; /*Safari,Opera,Chrome*/
  box-orient: horizontal;
  flex-direction:row;
  -webkit-flex-direction:row;
}
.box-x-center {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.box-x-left {
  -webkit-box-pack: start;
  -moz-justify-content: flex-start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}

.box-x-right {
  -webkit-box-pack: end;
  -moz-justify-content: flex-end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}

.box-y-center {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}


.box-y-bottom {
  -webkit-box-align: end;
  -moz-align-items: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
}

.box-item {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-flex: 1.0;
  -moz-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}


.box-wrap {
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  -moz-box-lines: multiple; /*Firefox*/
  -webkit-box-lines: multiple; /*Safari,Opera,Chrome*/
  box-lines: multiple;
}
// 垂直排列
.box-row{
  -moz-box-orient: vertical; /*Firefox*/
  -webkit-box-orient: vertical; /*Safari,Opera,Chrome*/
  box-orient: vertical;
  flex-direction:column;
  -webkit-flex-direction:column;
}

.box-row-flex {
  -webkit-flex: 1;        /* Chrome */  
  -ms-flex: 1;             /* IE 10 */  
  flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
  -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */  
  -moz-box-flex: 1;       /* OLD - Firefox 19- */    
  height: 1%;
}

.box-col-flex {
  -webkit-flex: 1;        /* Chrome */  
  -ms-flex: 1;             /* IE 10 */  
  flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
  -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */  
  -moz-box-flex: 1;       /* OLD - Firefox 19- */     
  width: 1%;
}

.box-space-bettwen{
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-flex: 1.0;
  -moz-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}

.box-col-1 {
  width: (1/12)*100%;
}

.box-col-2 {
  width: (2/12)*100%;
}

.box-col-3 {
  width: (3/12)*100%;
}

.box-col-4 {
  width: (4/12)*100%;
}

.box-col-5 {
  width: (5/12)*100%;
}

.box-col-6 {
  width: (6/12)*100%;
}

.box-col-7 {
  width: (7/12)*100%;
}

.box-col-8 {
  width: (8/12)*100%;
}

.box-col-9 {
  width: (9/12)*100%;
}

.box-col-10 {
  width: (10/12)*100%;
}

.box-col-11 {
  width: (11/12)*100%;
}

.box-col-12 {
  width: (12/12)*100%;
}

.box-offset-1 {
  margin-left: (1/12)*100%;
}

.box-offset-2 {
  margin-left: (2/12)*100%;
}

.box-offset-3 {
  margin-left: (3/12)*100%;
}

.box-offset-4 {
  margin-left: (4/12)*100%;
}

.box-offset-5 {
  margin-left: (5/12)*100%;
}

.box-offset-6 {
  margin-left: (6/12)*100%;
}

.box-offset-7 {
  margin-left: (7/12)*100%;
}

.box-offset-8 {
  margin-left: (8/12)*100%;
}

.box-offset-9 {
  margin-left: (9/12)*100%;
}

.box-offset-10 {
  margin-left: (10/12)*100%;
}

.box-offset-11 {
  margin-left: (11/12)*100%;
}

.half-x-line {
  height: 1px;
  background: #ccc;
  transform-origin: 0 0;
  transform: scale(1, 0.2);
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(1, 0.2);
}

.half-y-line {
  width: 1px;
  height: 100%;
  background: #aaa;
  transform-origin: 0 0;
  transform: scale(.2, 1);
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(.2, 1);
}

.Iinput {
  display: block;
  background: transparent;
  box-shadow: none;
  outline: none;
  border: 1px solid #cfdadd;
  color: #9e9e9e;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 2px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  line-height: 120%;
}

.Iinput:focus {
  border-color: #23b7e5;
}

.Ilabel {
  color: #5d5e5e;
  font-size: 14px;
  font-weight: bold;
}

.layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.no-touch {
  pointer-events: none;
}

.cursor {
  cursor: pointer;
}

.overtext {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overtext3{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.bac-image {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}


.h-tag {
  background: #ecf0f1;
  display: inline-block;
  height: 22px;
  line-height: 23px;
  padding: 0 12px;
  border-radius: 22px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 3px;
  margin-bottom: 5px;
}

.h-tag.active {
  background: #95a5a6;
  color: white;
}

.h-btn {
  border: 1px solid #ccd2d4;
  display: inline-block;
  height: 22px;
  line-height: 21px;
  padding: 0 5px;
  border-radius: 1px;
  cursor: pointer;
  margin-right: 3px;
  font-size: 12px;
}

.h-btn.md {
  height: 25px;
  line-height: 24px;
  padding: 0 10px;
}

.h-y-btn {
  height: 32px;
  width: 70px;
  border-radius: 26px;
  background: #81868c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  line-height: 100%;
}

.ts-btn {
  width: 60vw;
  height: 5.6vh;
  background: #bbbbbb;
  color: white;
  border-radius: 1vw;
  font-size: 4vw;
}

.ts-btn.active {
  background: #ff7373;
}

.border-red {
  border: 1px solid red;
}

.border-black {
  border: 1px solid black;
}

.bottom-border{
  position: relative;
  overflow: auto;
  &:before{
    content: '';
    position: absolute;
    bottom: 1px;
    left:0;
    right:0;
    height: 1px;
    background: #999;
    transform-origin: 0 0;
    transform: scale(1, 0.5);
    -webkit-transform-origin: 0 0;
    -webkit-transform: scale(1, 0.5);
    z-index: 2;
  }
}


.consultDetail {
  color: #2f2f2f;
  word-break: break-word!important;
  word-break: break-all;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  // overflow: hidden;
  img{
    width: 90vw !important;
  }
}


/*transition*/



.fade-enter-active,
.fade-leave-active {
  opacity: 1
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.scale-small-enter,
.scale-large-leave-active {
  opacity: 0;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(1.2, 1.2);
  transform: scale(1.2, 1.2);
}

.scale-small-leave-enter,
.scale-large-enter {
  opacity: 0;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(0.9, 0.9);
  transform: scale(0.9, 0.9);
}



.slide-left-enter,
.slide-keep-left-enter,
.slide-right-leave-active {
  /*opacity: 0;*/
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter,
.slide-keep-right-enter {
  /*opacity: 0;*/
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-top-enter,
.slide-keep-top-enter,
.slide-bottom-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
}

.slide-top-leave-active,
.slide-bottom-enter,
.slide-keep-bottom-enter {
  opacity: 0;
  -webkit-transform: translate(0, -100%);
  transform: translate(0, -100%);
}


</style>
