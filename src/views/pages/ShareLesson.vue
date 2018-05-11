<template lang="html">
  <div class="container" @click="jumpRegister">
    <div class="bac-image" :style="{ backgroundImage: `url('${basicData.imgUrl}')` }"/>
    <div class="c-content">
      <div class="c-h1">
        {{ basicData.sysCourseName }}
      </div>
      <div class="c-money">
        ￥:{{ basicData.price }}
      </div>
      <div class="box c-info">
        <div class="box box-y-center box-col-flex">讲师：{{ basicData.lecturer }}</div>
        <div class="box box-y-center box-col-flex box-x-right">学员：{{ basicData.studentCount }}</div>
      </div>
      <div class="box c-info">
        <div class="box box-y-center box-col-flex">{{ $Helper.formatDateTime(basicData.createTime) }}</div>
        <div class="box box-y-center box-col-flex box-x-right">收藏人数：{{ basicData.collectCount }}</div>
      </div>
    </div>
    <div class="box c-select">
      <div class="box box-item box-col-flex c-item active">
        详情介绍
      </div>
      <div class="box box-item box-col-flex c-item">
        目录
      </div>
      <div class="box box-item box-col-flex c-item">
        练习
      </div>
      <div class="box box-item box-col-flex c-item">
        资料下载
      </div>
      <div class="half-x-line"/>
    </div>
    <div class="c-activityBody" v-html="basicData.courseDetails"/>
    <div class="box c-bottom">
      <div class="box box-item">
        <i class="iconfont">&#xe60e;</i>收藏
      </div>
      <div class="box box-item box-col-flex active">
        立即购买
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      basicData: {},
      urlParams: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    getBasicData() {
      this.$Helper.ajax({
        url: 'open/course/getCourse',
        method: 'GET',
        params: { courseId: this.urlParams.id || 202 },
      }).then(({data}) => {
        if (data) {
          this.basicData = data
          this.$Helper.loadWx().then(
            () => {
              console.log('success')
              this.$Helper.resetWxShare({title: this.basicData.sysCourseName, desc: this.basicData.courseDetails, link: window.location.href, imgUrl: this.basicData.imgUrl || 'http://img.cnjczh.com/post_94_1522400716391'})
            },
            () => {
              console.log('error')
            }
          )
        } else {
          this.$Helper.message.toast({ text: '获取课程详情失败', long: 5000 })
          this.jumpRegister()
        }
      })
    },
    jumpRegister() {
      setTimeout(() => this.$Helper.jumpPage({ name: 'Share', params: { type: 'download', ...this.$Helper.getUrlParams() } }, this), 600)
    },
  },
  created() {
    // get params from url
    this.urlParams = this.$Helper.getUrlParams() || {}
    this.getBasicData()
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container {
    .bac-image{
      height: 25vh;
    }
    .c-content{
      padding: 2vw 3vw;
      .c-h1{
        font-size: 3.8vw;
        color:@fontColor1;
        font-weight: 500;
      }
      .c-money{
        font-size: 3.8vw;
        color:@fontActive2;
        font-weight: 500;
        padding:1vh 0;
      }
      .c-info{
        &>div{
          font-size: 3.2vw;
          color:@fontColor2;
          margin-top: 0.7vh;
          &:nth-child(1){
            color:@fontColor4;
          }
        }
      }
    }
    // ul{
    //   li{
    //     height: 6.5vh;
    //     position: relative;
    //     .name{
    //       width: 20vw;
    //       font-size: 3.8vw;
    //       color:@fontColor1;
    //     }
    //     .value{
    //       font-size: 3.4vw;
    //       color:@fontColor2;
    //       padding-right: 2vw;
    //     }
    //     .half-x-line{
    //       position: absolute;
    //       bottom: 0;
    //       left:0;
    //       right: 0;
    //     }
    //   }
    // }
    .c-select{
      height: 7vh;
      position: relative;
      border-top:1vh solid @bgColor;
      &>.c-item{
        font-size: 3.2vw;
        color: @fontColor2;
        border-bottom: 2px solid transparent;
        &.active{
          color:@activeColor;
          border-color: @activeColor;
        }
      }
      .half-x-line{
        position: absolute;
        bottom: 0;
        left:0;
        right: 0;
      }
    }
    .c-activityBody{
      padding:2vw;
      font-size: 3.6vw;
    }
    .c-bottom{
      position: fixed;
      bottom: 0;
      right: 0;
      left:0;
      &>div{
        width: 36vw;
        height: 6vh;
        background: #c0c0c0;
        color: white;
        font-size: 3.2vw;
        &>i{
          color: white;
          font-size: 4vw;
          margin-right: 3px;
        }
        &.active{
          background: @activeColor;
        }
      }
    }
  }
</style>
