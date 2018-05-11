<template lang="html">
  <IDetailContent class="container" @scrollToBottom="scrollToBottom">
    <div class="content">
      <h1>{{ basicData.consultName }}</h1>
      <div class="box">
        <img :src="basicData.photo || 'http://ozjjwh8gb.bkt.clouddn.com/180.png'" alt="photo">
        <div>
          <div class="auther box box-y-center">
            <span class="name">{{ basicData.nickname || '显百'}}</span>
            <span class="time">{{ $Helper.formatTime(basicData.createTime) }}</span>
          </div>
          <div class="info">
            <i class="iconfont">&#xe61f;</i> {{ basicData.num || 0 }}
            <i class="iconfont">&#xe611;</i> {{ basicData.commentNum || 0 }}
          </div>
        </div>
      </div>
      <img :src="basicData.consultImg" v-if="basicData.consultImg" alt="consultImg"/>
      <div class="consultDetail" v-html="basicData.consultDetail" />
    </div>
    <div class="commentList" v-if="commentList && commentList.length!==0">
      <IDetailOne v-for="(item, key) in commentList" :basicData="item" :index="key" :key="key"/>
    </div>
    <div class="empty-comment" v-else>
      <img src="static/icon/empty.png">
      <p>来叨叨两句呗~</p>
    </div>
    <div class="comment-btn-container box box-item" @click="openEntry">
      <div class="btn box box-item">
        <i class="iconfont">&#xe626;</i>
        评论
      </div>
    </div>
  </IDetailContent>
</template>
<script>
import IDetailOne from '../components/IDetailOne'
import IDetailContent from '../components/IDetailContent'
export default {
  components: {
    IDetailOne,
    IDetailContent,
  },
  data() {
    return {
      basicData: {
        createTime: '',
      },
      fetched: false,
      commentList: [],
      page: 1,
      comment: null,
    }
  },
  computed: {},
  watch: {},
  methods: {
    getCommentList(reset = false) {
      this.fetched = true
      this.$Helper.ajax({
        url: 'WeOpen.CommentList',
        method: 'GET',
        urlType: 'bbs',
        params: {
          page: this.page,
          type: 1,
          fid: this.basicData.id,
        },
      }).then(
        ({data}) => {
          this.commentList = (reset ? [] : this.commentList).concat(data.data)
          // this.hotList = data.data
          this.fetched = false
          if (data.data.length > 0) {
            this.page++
          } else {
            if (this.page !== 1) {
              this.$Helper.message.toast({
                text: '暂无更多内容',
                long: 2000,
              })
            }
          }
        },
        () => {
          this.fetched = false
        }
      )
    },
    scrollToBottom() {
      if (!this.fetched) this.getCommentList()
    },
    openEntry() {
      if (this.$Helper.getUrlParamsByKey('type') === 'download') {
        this.$Helper.jumpPage('Download', this)
        return
      }
      this.$store.dispatch('ToggleEntry', {show: true, titleid: this.basicData.id})
    },
    loadWx() {
      // load wx
      this.$Helper.loadWx().then(
        () => {
          console.log('success')
          let link = window.location.href
          // if (link.indexOf('?id') === -1) {
          //   link += `?id=${this.basicData.id}&type=download`
          // } else {
          //   link += `&type=download`
          // }
          this.$Helper.resetWxShare({title: this.basicData.consultName, desc: this.basicData.consultDetail, link, imgUrl: this.basicData.consultImg || 'http://img.cnjczh.com/post_94_1522400716391'})
        },
        () => {
          console.log('error')
        }
      )
    },
  },
  created() {
    let basicData = this.$route.params.basicData || JSON.parse(this.$Helper.getCookie('postDetail') || '{}')
    this.$Helper.ajax({
      url: 'WeOpen.ConsultDetail',
      method: 'GET',
      urlType: 'bbs',
      params: {
        id: this.$Helper.getUrlParamsByKey('id') || basicData.id,
        type: 1,
      },
    }).then((data) => {
      this.basicData = data.data.data
      // save to cache
      this.$Helper.setCookie('postDetail', this.basicData)
      // get comment list
      this.getCommentList()
      this.$Helper.onAction('commentSuccess', () => {
        this.page = 1
        this.comment = null
        this.getCommentList(true)
      })
      this.$Helper.onAction('addLike', key => {
        this.$Helper.message.toast({
          text: '已点赞',
          long: 2000,
        })
        this.commentList.splice(key, 1, {
          ...this.commentList[key],
          haslike: 1,
          likeNum: parseInt(this.commentList[key].likeNum) + 1,
        })
      })
      this.loadWx()
    })
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container {
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 8vh;
    // border:1px solid red;
    &>.content{
      padding:0 5vw 2vh 5vw;
      margin:auto;
      // border: 1px solid red;
      &>h1{
        padding:2vh 0;
        font-size: 5vw;
        font-weight: 500;
        line-height: 1.3;
        color: #333333;
      }
      &>.box{
        margin-bottom: 20px;
        &>img{
          width: 5.5vh;
          height: 5.5vh;
          border-radius: 100%;
        }
        &>div{
          padding-left: 15px;
          &>.auther{
            padding-top:0.1vw;
            .name{
              margin-right: 10px;
              font-size: 3.3vw;
              color: @fontColor2;
            }
            .time{
              font-size: 3vw;
              color: @fontColor3;
            }
          }
          &>.info{
            margin-top:0.5vh;
            font-size: 3vw;
            color: #888;
            i{
              font-size: 3vw;
              color: #888;
              &:nth-child(1){
                margin: 0;
              }
              margin-left: 10px;
            }
          }
        }
      }
      &>img{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 50px;
      }
    }
    &>.commentList{
      border-top: 1vh #f0f0f0 solid;
    }
    &>.empty-comment{
      border-top: 1vh #f0f0f0 solid;
      height:40vh;
      background: white;
      text-align: center;
      img{
        width:20vw;
        margin-top:10vh;
        margin-bottom:2vh;
      }
      p{
        color:@basicFontColor;
        font-size:3.5vw;
      }
    }
    &>.comment-btn-container{
      position: fixed;
      bottom: 0;
      left:0;
      right: 0;
      height: 8vh;
      background: white;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
      &>.btn{
        &>i{
          font-size: 3.5vw;
          margin-right: 1vw;
          // position: relative;
          // top:2px;
        }
        height: 5.6vh;
        border-radius: 5vh;
        width: 85vw;
        padding: 0 5vw;
        background: #eff0f2;
        font-size: 3.5vw;
      }
    }
  }
</style>
