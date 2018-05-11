<template lang="html">
  <div class="s-container">
    <div class="head box">
      <div class="box box-y-center">
        <img :src="basicData.photo || 'http://ozjjwh8gb.bkt.clouddn.com/180.png'" alt="photo"> 
        <span class="name">{{ basicData.nickName }}</span>
        {{ $Helper.formatTime(basicData.createTime) }}
      </div>
      <div class="box box-y-center box-col-flex box-x-right">
        <!-- {{ index + 1 }}楼 -->
      </div>
    </div>
    <div class="content">
      {{ basicData.pid ? `@${basicData.pidNickName}:  ` : '' }}{{ basicData.comment }}
    </div>
    <div class="bottom box box-y-center box-x-right">
      <span class="box box-item" :class="{ active: basicData.haslike !== '0' }" @click="addLike(index, basicData.haslike)"><i class="iconfont">&#xe60d;</i> {{ basicData.likeNum }}</span>
      <span class="box box-item"><i class="iconfont comment" @click="addComment">&#xe611;</i></span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    basicData: {
      type: Object,
      default: {},
    },
    index: {
      default: 0,
    },
  },
  computed: {
    ...mapState('basic', [
      'basic',
    ]),
  },
  watch: {},
  methods: {
    addLike(key, isActvie) {
      if (isActvie !== '0') {
        this.$Helper.message.toast({
          text: '您刚刚赞过',
          long: 2000,
        })
        return
      }
      this.$Helper.emitAction('addLike', key)
      this.$Helper.ajax({
        url: 'WeConsult.InsertCommentLike',
        method: 'GET',
        urlType: 'bbs',
        params: {
          fid: this.basicData.id,
        },
      }).then(
        ({data}) => {
          // console.log(data)
          // this.$Helper.message.toast({
          //   text: '已点赞',
          //   long: 2000,
          // })
        },
        () => {
          this.$Helper.message.toast({
            text: '点赞失败',
            long: 2000,
          })
        }
      )
    },
    addComment() {
      this.$store.dispatch('ToggleEntry', {show: true, titleid: this.basicData.fid, userId: this.basicData.userId})
      // this.$prompt(`回复${this.basicData.nickName}的帖子：`, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      // }).then(({ value }) => {
      //   this.$Helper.ajax({
      //     url: 'WeConsult.InsertComment',
      //     method: 'GET',
      //     urlType: 'bbs',
      //     params: {
      //       comment: value,
      //       type: 1,
      //       fid: this.basicData.fid,
      //       pid: this.basicData.userId,
      //     },
      //   }).then(
      //     ({data}) => {
      //       let {code, context} = data
      //       this.$message({
      //         message: context,
      //         type: code === 1 ? 'success' : 'info',
      //       })
      //       this.$Helper.emitAction('commentReload')
      //     },
      //     () => {
      //       this.$message({
      //         message: '评论失败',
      //         type: 'error',
      //       })
      //     }
      //   )
      // }).catch(() => {})
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .s-container{
    background: white;
    padding:3vw 5vw;
    margin-bottom:1vh;
    .head{
      height: 7vh;
      &>div{
        height: 100%;
        font-size: 2.8vw;
        color: @fontColor3;
        img{
          height: 5.5vh;
          width: 5.5vh;
          border-radius: 5.5vh;
          margin-right:2vw;
        }
        .name{
          font-size: 3.6vw;
          margin-right: 2vw;
          // font-weight: 500;
          color: @fontColor2;
        }
      }
    }
    .content{
      font-size: 3.2vw;
      color: @fontColor3;
      padding: 1vw;
    }
    .bottom{
      font-size: 3vw;
      color: @fontColor4;
      span{
        &.active{
          color: @activeColor;
          i{
            color: @activeColor;
          }
        }
        i{
          font-size: 4.5vw;
          &.comment{
            margin-left: 4vw;
            font-size: 3.5vw;
            position: relative;
            // top:2px;
          }
        }
      }
    }
  }
</style>
