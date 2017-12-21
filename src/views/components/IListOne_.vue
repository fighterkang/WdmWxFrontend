<template lang="html">
  <div class="s-container" @click="getListDetail">
   <audio  name="media" ref="audio" v-if="data.voice"><source :src="data.voice" type="audio/mpeg"/></audio>
   <img class="ding-img" :src="icon.ding" v-if="canCancelTop" @click.stop="cancelTop">
   <div class="head box">
    <div class="image box box-y-center box-x-left">
      <div class="head-image" :style="{backgroundImage:`url('${data.wxuser ? data.wxuser.headimgurl : ''}')`}">
        <img :src="icon.vip" v-if="data.level!=1">
      </div>
    </div>
    <div class="name box-col-flex">
      <h5>
        {{ data.wxuser ? data.wxuser.nickname : '' }}
        <!-- <i class="iconfont" v-if="data.level!=1">&#xe61b;</i> -->
      </h5>
      <span v-if="data.create_time">{{ formatTime(data.create_time) }}</span>
      <span class="location" v-if="$route.name === 'ListDetail' && locationCity">
        <i class="iconfont">&#xe655;</i>
        {{ locationCity }}
      </span>
    </div>
    <div class="setting box box-item">
      <!-- <span v-if="showDelete" @click.stop="deleteTitle">删除</span> -->
      <!-- <div class="dashang-btn box box-item" v-if="data.role_reward" @click.stop="addReward">
         <i class="iconfont">&#xe634;</i>&nbsp;赏
      </div> -->
      <IButton @clickFn="addReward" v-if="data.role_reward" size="small">
        <i class="iconfont">&#xe634;</i>赏
      </IButton>
    </div>
   </div>
   <div class="content" v-if="data.isVoice!=='2'">
     <!-- <span class="zhiding-status" v-if="canCancelTop" @click.stop="cancelTop">
        <i class="iconfont">&#xe643;</i> 置顶
     </span> -->
     {{ data.content }}
   </div>
   <div class="voice" v-else>
     <div class="voice-btn box box-y-center box-x-right active" @click.stop="toggleAudio" :style="{backgroundImage: `url('${icon.voice}')`}">
      <i class="iconfont" v-if="!isPlaying">&#xe630;</i>
      <div class="loader-inner line-scale-pulse-out" v-else>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
   </div>
   <ul class="img-content box box-wrap" v-if="data.img && data.img.length>0">
    <li class="bac-image" :style="{backgroundImage:`url('${item}')`}" v-for="(item,key) in data.img" @click.stop="previewImage(item)"></li>
   </ul>
   <!-- <div class="foot box">
     <div class="viewsnum box box-y-center">
      浏览{{ data.read }}次
     </div>
     <ul class="foot-handle box-col-flex">
      <li class="box box-item" @click.stop="addWarn">
        <i class="iconfont">&#xe626;</i>
      </li>
      <li class="box box-item" @click.stop="addComment">
        <i class="iconfont">&#xe612;</i> &nbsp;{{ data.comment }}
      </li>
      <li class="box box-item" :class="{active: isLike}" @click.stop="addLike">
        <i class="iconfont">&#xe602;</i> &nbsp;{{ likeCount }}
      </li>
       <li class="box box-item" v-if="data.role_reward" @click.stop="addReward">
        <i class="iconfont">&#xe634;</i>
      </li> 
     </ul>
   </div> -->
   <div class="half-x-line"></div>
   <div class="foot box box-y-center">
    <ul class="foot-handle box-col-flex">
      <li class="box box-y-center" >
        <img :src="icon.see"> &nbsp;{{ data.read }}
      </li>
      <li class="box box-y-center" @click.stop="addComment">
        <img :src="icon.comment"> &nbsp;{{ data.comment }}
      </li>
      <li class="box box-y-center" :class="{active: isLike}" @click.stop="addLike">
        <div class="box box-y-center"  v-if="!isLike"><img :src="icon.like"> &nbsp;{{ likeCount }}</div>
        <div class="box box-y-center" v-else><img :src="icon.like_active" > &nbsp;{{ likeCount }}</div>
      </li>
      <li class="box box-y-center" v-if="showDelete" @click.stop="deleteTitle">
        <img :src="icon.delete"> &nbsp;{{ data.delete }}
      </li>
    </ul>
    <img :src="icon.warn" @click.stop="addWarn"> 
   </div>
  </div>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
import _ from 'lodash'
import IButton from './IButton'
// import testAudio from '@/audio.mp3'
export default {
  components: {
    IButton,
  },
  data() {
    return {
      isPlaying: false,
      likeCount: this.data.like,
      isLike: this.data.isLike,
      icon: {
        ding: 'static/icon/ding.png',
        vip: 'static/icon/vip.png',
        see: 'static/icon/see.png',
        like: 'static/icon/like.png',
        like_active: 'static/icon/like_active.png',
        comment: 'static/icon/comment.png',
        warn: 'static/icon/warn.png',
        delete: 'static/icon/delete.png',
        voice: 'static/icon/voice.png',
      },
    }
  },
  props: ['data'],
  computed: {
    ...mapState('basic', ['basic']),
    ...mapState(['locationCity']),
    showDelete() {
      let returnData = false
      if (this.data.openid === this.basic.openid) returnData = true
      if (this.role === '1' && _.get(this, 'basic.power.level') === '1') {   // 具有操作权限，如果是非管理员发的贴
        returnData = true
      }
      return returnData
    },
    from() {
      return _.get(this, 'data.from')
    },
    role() {    // 具有操作权限
      return this.data.from === '1' ? _.get(this, 'basic.power.role_exchange') : _.get(this, 'basic.power.role_match')
    },
    canCancelTop() {
      return this.data.top === '1'
    },
    NotList() {
      return ['MyList', 'ListDetail'].indexOf(this.$route.name) !== -1
    },
  },
  watch: {
    data() {
      this.likeCount = this.data.like
      this.isLike = this.data.isLike
    },
  },
  mounted() {
    if (this.data.voice) {
      this.$Helper.onAction('stopAudio', (ele) => {
        let audioEle = this.$refs.audio
        // console.log(ele === audioEle)
        if (this.isPlaying && ele !== audioEle) {     // 如果在播放就停止
          audioEle.currentTime = 0
          audioEle.pause()
          this.isPlaying = false
        }
      })
    }
  },
  methods: {
    formatTime(time) {
      return this.$Helper.formatTime(time)
    },
    getListDetail() {
      // router.push({ name: 'ListDetail', params: { titleid: this.data.id } })
      this.$Helper.jumpPage({ name: 'ListDetail', params: { titleid: this.data.id } }, this)
    },
    addComment() {
      this.$store.dispatch('ToggleEntry', { titleid: this.data.id, type: this.data.from === '1' ? 'ExchangeList' : 'GameList', show: true })
      // document.getElementById('Iinput').focus()
    },
    addLike() {
      if (this.isLike) return
      let type
      if (this.NotList) {
        type = this.data.from === '1' ? 'ExchangeList' : 'GameList'
      } else {
        type = this.$route.name
      }
      this.$store.dispatch('addLikeCount', {
        titleid: this.data.id,
        type,
      })
      // 更新本页
      this.likeCount = !this.likeCount ? 0 : parseInt(this.likeCount)
      this.likeCount++
      this.isLike = 1

      this.$Helper.ajax({
        url: 'Open.Like',
        params: {
          pid: this.data.id,
          class: 1,
        },
        success: ({ code, context }) => {
          if (code === 1) {
            context = '已点赞'
          }
          this.$Helper.message.toast({
            text: context,
            long: 2000,
          })
        },
      })
    },
    addReward() {
      if (this.basic.power === -1) {
        // router.push({ name: 'Setting' })
        this.$Helper.jumpPage('Setting', this)
        this.$Helper.message.toast({
          text: '您还未验证，请先完善您的基本信息',
          long: 2000,
        })
        return
      }
      this.$store.dispatch('ToggleReward', { titleid: this.data.id, show: true })
    },
    addWarn() {
      this.$store.dispatch('TogglePrpmptData', { titleid: this.data.id, show: true })
    },
    deleteTitle() {
      this.$Helper.message.comfirm({
        text: '删除可就没有喽~',
        show: true,
        lFn: () => {
          this.$Helper.ajax({
            url: 'Open.DeleteMicroblog',
            params: {
              microblog_id: this.data.id,
            },
            success: ({ code, context }) => {
              if (code === 1) {
                context = '删除成功'
                let type
                if (this.$route.name === 'MyList') {
                  type = this.data.from === '1' ? 'ExchangeList' : 'GameList'
                } else {
                  type = this.$route.name
                }
                this.$store.dispatch('deleteTitle', {
                  titleid: this.data.id,
                  type,
                })
                // 删除我的帖子中的该帖
                this.$Helper.emitAction('deleteTitle', {
                  titleid: this.data.id,
                })
                setTimeout(() => {
                  if (this.$route.name === 'ListDetail') this.$Helper.jumpPage({ name: this.data.from === '1' ? 'ExchangeList' : 'GameList' }, this)
                }, 600)
              }
              this.$Helper.message.toast({
                text: context,
                long: 2000,
              })
            },
          })
        },
      })
    },
    toggleAudio() {
      // 首先将所有正在播放的音乐关闭
      let audioEle = this.$refs.audio
      this.$Helper.emitAction('stopAudio', audioEle)
      // console.log(audioEle)
      if (!this.isPlaying) {
        audioEle.play()
        this.isPlaying = true
      } else {
        audioEle.currentTime = 0
        audioEle.pause()
        this.isPlaying = false
      }
    },
    cancelTop() {
      if (this.role === '1' && _.get(this, 'basic.power.level') === '2' && this.data.openid === this.basic.openid) {
        this.$Helper.message.comfirm({
          text: '确定要取消置顶吗？',
          show: true,
          lFn: () => {
            this.$Helper.ajax({
              url: 'Open.DeTop',
              params: {
                microblog_id: this.data.id,
              },
              success: ({ code, context }) => {
                if (code === 1) {
                  context = '已取消置顶'
                  this.$store.dispatch('cancelTop', {
                    titleid: this.data.id,
                  })
                }
                this.$Helper.message.toast({
                  text: context,
                  long: 2000,
                })
              },
            })
          },
        })
      } else {
        this.$Helper.message.toast({
          text: '权限不足',
          long: 2000,
        })
      }
    },
    previewImage(image) {
      this.$store.dispatch('PreviewImage', {
        show: true,
        image,
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../theme/index.less";

.s-container {
  background-color: white;
  padding: 1vh 3vw 0 3vw;
  margin-bottom: 1vh;
  border-top: 1px solid #f1f1f3;
  border-bottom: 1px solid #f1f1f3;
  position: relative;
  .ding-img {
    position: absolute;
    right: 0;
    top: 0;
    width: 10vw;
  }
}

.head {
  height: 8vh;
  .image {
    width: 12%;
    .head-image {
      width: 6vh;
      height: 6vh;
      border: 1px solid #eee;
      border-radius: 100%; // background-image:url('static/headImage.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      img {
        position: absolute;
        right: -2.1vw;
        bottom: -1vw;
        width: 4.2vw;
      }
    }
  }
  .name {
    padding-top: .3vh;
    padding-left: 2vw;
    h5 {
      margin: .5vh 0;
      font-size: 4.3vw;
      color: @activeFontColor;
      i {
        color: #fdb86d;
      }
    }
    span {
      font-size: 3.2vw;
      color: #7a7a7a;
      margin-top: 1vh;
      font-weight: normal;
      i {
        font-size: 2.8vw;
      }
    }
    span.location {
      margin-left: 3vw;
      i {
        position: relative;
        top: -2px;
      }
    }
  }
  .setting {
    width: 20%;
    span {
      color: #ff9393;
      font-size: 3.7vw;
    }
    .dashang-btn {
      width: 18vw;
      height: 4.25vh;
      border-radius: 4.4vh;
      font-size: 2.2vh;
      color: @activeFontColor;
      border: 1px solid @activeFontColor;
      i {
        margin-top: .5vw;
      }
    }
  }
}

.content {
  padding: 2vh 0;
  font-size: 4.5vw;
  .zhiding-status {
    display: inline-block;
    padding: .3vw 1.5vw;
    border-radius: .6vw;
    background: #ffb967;
    color: white;
    font-size: 3vw;
    i {
      font-size: 3vw;
    }
    position: relative;
    top:-2px;
  }
}

.voice-btn {
  width: 60vw;
  // padding:0 3vw;
  height: 13vw; // background: #eeeeee;
  background-position: center center;
  background-size: 100% 100%;
  border-radius: 1vw; // border: 1px solid #dfdfdf;
  margin: 3vh 0;
  color: #7f7f7f;
  font-size: 4.2vw;
  i {
    margin-right: 3vw;
    margin-top: 3vw;;
    font-size: 5vw;
    color: white;
  }
}

.dot {
  position: relative;
}

.dot.active:before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: red;
  position: absolute;
  top: 4px;
  right: -10px;
}

.img-content {
  li {
    width: 30vw;
    height: 30vw;
    margin-bottom: 2vw;
    margin-right: 2vw;
  }
  li:nth-child(3),
  li:nth-child(6) {
    margin-right: 0;
  }
}

.foot {
  height: 5.6vh;
  img {
    height: 4.5vw;
  }
  .viewsnum {
    color: #7f7f7f;
  }
  .foot-handle {
    li {
      float: left;
      color: #cccccc;
      width: 15vw;
      height: 100%;
      font-size: 3vw; // i {
      //   color: #cccccc;
      //   font-size: 5vw;
      // }
    }
    li.active {
      color: @activeFontColor;
      i {
        color: #fd9192;
      }
    }
  }
}
.line-scale-pulse-out{
  -webkit-transform: scale(.4,.5);
  transform: scale(.4,.5);
  margin-top:3vw;
}

.line-scale-pulse-out>div {
  background-color: #fff;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85);
  animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85);
}

.line-scale-pulse-out>div:nth-child(2),
.line-scale-pulse-out>div:nth-child(4) {
  -webkit-animation-delay: 0.2s !important;
  animation-delay: 0.2s !important;
}

.line-scale-pulse-out>div:nth-child(1),
.line-scale-pulse-out>div:nth-child(5) {
  -webkit-animation-delay: 0.4s !important;
  animation-delay: 0.4s !important;
}

@-webkit-keyframes line-scale-pulse-out {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }

  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }

  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}

@keyframes line-scale-pulse-out {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }

  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }

  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}
</style>
