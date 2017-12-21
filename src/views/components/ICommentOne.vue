<template lang="html">
  <div class="s-container">
   <div class="head box">
    <div class="image box box-item">
      <div class="head-image" :style="{backgroundImage:`url('${data.wxuser ? data.wxuser.headimgurl : ''}')`}">
        <img :src="icon.vip" v-if="data.level!=1">
      </div>
    </div>
    <div class="name box-col-flex">
      <h5>
        {{ data.wxuser ? data.wxuser.nickname : '' }}
        <!-- <i class="iconfont" v-if="data.wxuser && data.wxuser.level && data.wxuser.level!=1">&#xe61b;</i> -->
      </h5>
      <p>{{ formatTime(data.create_time) }}</p>
    </div>
    <ul class="foot-handle box-col-flex">
       <!-- <li class="box box-item" :class="{active: isLike}" @click="addLike">
        <i class="iconfont">&#xe602;</i> {{ likeCount }}
      </li>
      <li class="box box-item" @click="deleteComment">
        <i class="iconfont">&#xe615;</i>
      </li>  -->
      <li class="box box-y-center" :class="{active: isLike}" @click.stop="addLike">
        <div class="box box-y-center"  v-if="!isLike"><img :src="icon.like"> &nbsp;{{ likeCount }}</div>
        <div class="box box-y-center" v-else><img :src="icon.like_active" > &nbsp;{{ likeCount }}</div>
      </li>
      <li class="box box-y-center"  @click="deleteComment">
        <img :src="icon.delete">
      </li>
    </ul>
   </div>
   <div class="content">
     {{ data.content }}
   </div>
   <div class="half-x-line"></div>
  </div>
</template>

<script>
// import router from '@/router'
export default {
  data() {
    return {
      isLike: this.data.isLike,
      likeCount: this.data.like,
      icon: {
        vip: 'static/icon/vip.png',
        delete: 'static/icon/delete.png',
        like: 'static/icon/like.png',
        like_active: 'static/icon/like_active.png',
      },
    }
  },
  props: ['data'],
  watch: {
    data() {
      this.likeCount = this.data.like
      this.isLike = this.data.isLike
    },
  },
  created() {
    // console.log(this.data)
  },
  methods: {
    formatTime(time) {
      return this.$Helper.formatTime(time)
    },
    getListDetail() {
      // router.push({ name: 'ListDetail' })
      this.$Helper.jumpPage('ListDetail', this)
    },
    addLike() {
      if (this.isLike) return
      let likeCount = !this.likeCount ? 0 : parseInt(this.likeCount)
      this.isLike = 1
      this.likeCount = likeCount + 1
      this.$Helper.ajax({
        url: 'Open.Like',
        params: {
          pid: this.data.id,
          class: 2,
        },
        success: ({ code, context }) => {
          if (code === 1) {
            this.$Helper.message.toast({
              text: '已点赞',
              long: 2000,
            })
          }
        },
      })
    },
    deleteComment() {
      this.$Helper.message.comfirm({
        text: '删除可就没有喽~',
        show: true,
        lFn: () => {
          this.$Helper.ajax({
            url: 'Open.DeleteComment',
            params: {
              comment_id: this.data.id,
            },
            success: ({ code, context }) => {
              if (code === 1) {
                context = '删除成功'
                this.$Helper.emitAction('deleteComment', {id: this.data.id})
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
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.s-container {
  background-color: white;
  padding-top: 1vh;
}

.head {
  padding: 0 2vw;
  height: 8vh;
  .image {
    width: 15%;
    .head-image {
      width: 6vh;
      height: 6vh;
      border: 1px solid #eee;
      border-radius: 100%; // background-image:url('static/headImage.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      img{
        position: absolute;
        right:-2.1vw;
        bottom:-1vw;
        width:4.2vw;
      }
    }
  }
  .name {

    padding-left: 2vw;
    h5 {
      margin-top: .7vh;
      font-size: 4.3vw;
      i {
        color: #fdb86d;
      }
    }
    p {
      font-size: 3.2vw;
      color: #7a7a7a;
      margin-top: .5vh;
      font-weight: normal;
    }
  }
  .setting {

    width: 20%;
  }
}

.content {
  padding: 2vh 2vw;
  font-size: 4vw;
  word-break: break-all;
}


.foot-handle {
  height: 100%;
  img{
    height:4.5vw;
  }
  li {
    float: right;
    width: 8vh;
    height: 100%;
    font-size: 3vw;
    color: #cccccc;
    i {
      color: #cccccc;
      font-size: 5vw;
    }
  }
  li.active {
    color: @activeFontColor;
    i {
      color: @activeFontColor;
    }
  }
}

.half-x-line {
  background: #bbb;
}
</style>
