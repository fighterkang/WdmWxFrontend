<template lang="html">
  <div class="s-container" @click="getListDetail">
   <div class="head box">
    <div class="image box box-item">
      <div class="head-image" :style="{backgroundImage:`url('${data.wxuser.headimgurl}')`}">
        <img :src="icon.vip" v-if="data.level!=1">
      </div>
    </div>
    <div class="name box-col-flex">
      <h5>
        <span>{{ data.wxuser.nickname }}</span>
        <!-- <i class="iconfont" v-if="data.level!='1'">&#xe61b;</i> -->
        {{ type ? '赞' : '评论' }}了你
      </h5>
      <p>{{ formatTime(data.create_time) }}</p>
    </div>
    <div class="setting box box-item" @click.stop="deleteUpvote">
      <!-- <span @click.stop="deleteUpvote">删除</span> -->
      <img :src="icon.delete">
    </div>
   </div>
   <div class="content">
     <span>{{ type ? '帖子' : '评论' }}:</span> {{ data.content }}
   </div>
  </div>
</template>

<script>
// import router from '@/router'
export default {
  data() {
    return {
      icon: {
        vip: 'static/icon/vip.png',
        delete: 'static/icon/delete.png',
      },
    }
  },
  props: ['type', 'data'],
  methods: {
    getListDetail() {
      // router.push({ name: 'ListDetail', params: { titleid: this.data.id } })
      this.$Helper.jumpPage({ name: 'ListDetail', params: { titleid: this.data.microblog_id || this.data.id } }, this)
    },
    formatTime(time) {
      return this.$Helper.formatTime(time)
    },
    deleteUpvote() {
      let url, params, type
      if (this.$route.name === 'MyMessage') {
        url = 'Open.DeleteMsg'
        params = {
          id: this.data.id,
        }
        type = 1
      } else {
        if (this.type) {    // 赞
          url = 'Open.DeleteLike'
          params = {
            like_id: this.data.like_id,
          }
          type = 2
        } else {  // 评论
          url = 'Open.DeleteComment'
          params = {
            comment_id: this.data.id,
          }
          type = 3
        }
      }
      this.$Helper.message.comfirm({
        text: '确定要删除该信息吗？',
        show: true,
        lFn: () => {
          this.$Helper.ajax({
            url,
            params,
            success: ({ code, context }) => {
              if (code === 1) {
                context = '删除成功'
                this.$Helper.emitAction('deleteMessage', {
                  id: this.data.id,
                  type,
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
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../theme/index.less";

.s-container {
  background-color: white;
  margin-bottom: 1vh;
  padding-top: 1vh;
  border-top: 1px solid #f1f1f3;
  border-bottom: 1px solid #f1f1f3;
}

.head {
  padding: 1vh 2vw;
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
      img {
        position: absolute;
        right: -2.1vw;
        bottom: -1vw;
        width: 4.2vw;
      }
    }
  }
  .name {

    padding-left: 2vw;
    h5 {
      margin: .5vh 0;
      font-size: 4.3vw; // i {
      //   color: #fdb86d;
      // }
      span {
        color: @activeFontColor;
      }
    }
    p {
      font-size: 3.2vw;
      color: #7a7a7a;
      margin-top: 1vh;
      font-weight: normal;
    }
  }
  .setting {
    width: 15%;
    span {
      color: #ff9393;
      font-size: 3.7vw;
    }
    img {
      height: 4.5vw;
    }
  }
}

.content {
  width: 92%;
  margin: 2vh auto;
  padding: 1.4vw 1vw;
  border-radius: .5vw;
  font-size: 4vw;
  background: #f3f3f3;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    font-size: 4vw;
    color: #333;
  }
}


.foot-handle {
  li {
    float: right;
    width: 8vh;
    height: 100%;
    font-size: 3vw;
    i {
      font-size: 6vw;
    }
  }
  li.active {
    color: #fd9192;
  }
}

.half-x-line {
  background: #bbb;
}
</style>
