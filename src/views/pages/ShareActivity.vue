<template lang="html">
  <div class="container" @click="jumpRegister">
    <div class="bac-image" :style="{ backgroundImage: `url('${basicData.activityImg}')` }"/>
    <ul>
      <li class="box">
        <div class="box box-item name">
          活动主题
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ basicData.activityTitle }}
        </div>
        <div class="half-x-line"/>
      </li>
      <li class="box">
        <div class="box box-item name">
          活动时间
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ $Helper.formatDateTime(basicData.createTime) }}
        </div>
        <div class="half-x-line"/>
      </li>
      <li class="box">
        <div class="box box-item name">
          活动地址
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ basicData.activityAddress }}
        </div>
        <div class="half-x-line"/>
      </li>
      <li class="box">
        <div class="box box-item name">
          活动费用
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ basicData.activityMoney }}
        </div>
        <div class="half-x-line"/>
      </li>
      <li class="box">
        <div class="box box-item name">
          活动人数
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ basicData.activityNum }}
        </div>
        <div class="half-x-line"/>
      </li>
      <li class="box">
        <div class="box box-item name">
          联系方式
        </div>
        <div class="box box-y-center box-x-right value box-col-flex">
          {{ basicData.phone }}
        </div>
        <div class="half-x-line"/>
      </li>
    </ul>
    <div class="box c-select">
      <div class="box box-item box-col-flex c-item active">
        详情
      </div>
      <div class="box box-item box-col-flex c-item">
        评论
      </div>
      <div class="half-x-line"/>
    </div>
    <div class="c-activityBody" v-html="basicData.activityBody"/>
    <div class="box c-bottom">
      <div class="box box-item">
        <i class="iconfont">&#xe60e;</i>收藏
      </div>
      <div class="box box-item">
        <i class="iconfont">&#xe626;</i>评论
      </div>
      <div class="box box-item box-col-flex active">
        立即报名
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
        url: 'open/getActivityInfo',
        method: 'GET',
        params: { id: this.urlParams.id || 44 },
      }).then(({data}) => {
        if (data) {
          this.basicData = data
          this.$Helper.loadWx().then(
            () => {
              console.log('success')
              this.$Helper.resetWxShare({title: this.basicData.activityTitle, desc: this.basicData.activityBody, link: window.location.href, imgUrl: this.basicData.activityImg || 'http://img.cnjczh.com/post_94_1522400716391'})
            },
            () => {
              console.log('error')
            }
          )
        } else {
          this.$Helper.message.toast({ text: '获取活动详情失败', long: 5000 })
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
    ul{
      li{
        height: 6.5vh;
        position: relative;
        .name{
          width: 20vw;
          font-size: 3.8vw;
          color:@fontColor1;
        }
        .value{
          font-size: 3.4vw;
          color:@fontColor2;
          padding-right: 2vw;
        }
        .half-x-line{
          position: absolute;
          bottom: 0;
          left:0;
          right: 0;
        }
      }
    }
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
        width: 26vw;
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
