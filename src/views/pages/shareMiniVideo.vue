<template>
  <div class="container">
    <!--<video class="videoContainer" autoplay controls preload>-->
      <!--<source type="video/mp4" :src="initData.videoAdd">-->
      <!--<source type="video/ogg" :src="initData.videoAdd">-->
      <!--<source type="video/webm" :src="initData.videoAdd">-->
      <!--<object :data="initData.videoAdd">-->
        <!--<embed :src="initData.videoAdd">-->
      <!--</object>-->
      <!--<p>很抱歉！您的浏览器不支持视频控件请更新版本/使用uc浏览器等</p></video>-->
    <video :src="initData.videoAdd" class="videoContainer" controls>
      很抱歉！您的浏览器不支持视频控件请更新版本
    </video>
    <div class="sidebar" @click="goDownLoad()">
      <span class="clearfix">
        <img :src="initData.videoImg" alt="" class="img1">
        <img :src="ic_plus" alt="" class="ic_plus">
      </span>
      <span>
        <img :src="aImg2" alt="" class="img2">
        <span class="aNum">{{initData.sayGoodCount}}</span>
      </span>
      <span>
        <img :src="aImg3" alt="" class="img3">
        <span class="aNum">{{initData.sayGoodCount}}</span>
      </span>
    </div>
    <div class="comment" @click="goDownLoad()">
      <input type="text" placeholder="评论一下吧">
    </div>
  </div>
</template>
<script>
  //  import IDetailOne from '../components/IDetailOne'
  export default {
    components: {
//      IDetailOne
    },
    data() {
      return {
        aImg2: 'static/icon/ic_heart.png',
        aImg3: 'static/icon/ic_talk.png',
        ic_plus: 'static/icon/ic_publish.png',
        initData: {
//          videoAdd: 'http://video.youji.pro/94c60ea4aa3e4c39baf3e4f1bf05369f/9d2acce89dc049da96d51eebfd85e49c-fb7c29a19e1dea4090f7127ce589aa56-ld.mp4',
          videoAdd: '',
          sayGoodCount: 0,
          videoImg: '',
//          videoImg: 'http://pic.58pic.com/58pic/13/70/38/23C58PICQix_1024.jpg',
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
      goDownLoad() {
        setTimeout(() => this.$Helper.jumpPage('Download', this), 600)
      },
      initMedioData() {
        this.$Helper.ajax({
          url: `open/minivideo/shareVideo?videoId=${this.$route.query.minivideoid}`,
//        url: `examCenter/mockExam?SecondId=3`,
          urlType: 'api',
          method: 'GET',
        }).then((res) => {
          if (res.data && res.data.videoAdd) {
            Object.assign(this.initData, res.data)
          } else {
            this.$Helper.message.toast({
              text: res.message,
              long: 2000,
            })
          }
        })
      },
    },
    created() {
      this.initMedioData()
    },
    mounted() {
    },
//    props: ['type', 'data'],
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .videoContainer {
    height: calc(100% - 100 * @vh);
    width: 100%;
  }

  .sidebar {
    position: fixed;
    height: 360*@vh;
    right: 10*@vh;
    top: 50%;
    margin-top: -180*@vh;
    display: flex;
    flex-direction: column;
    > span {
      position: relative;
      margin-bottom: 60*@vh;
      [class^='img'] {
        width: 80*@vh;
        height: 80*@vh;
        &.img1 {
          border-radius: 50%;
        }
      }
      .ic_plus {
        position: absolute;
        height: 40*@vh;
        width: 40*@vh;
        left: 50%;
        bottom: -10*@vh;
        margin-left: -20*@vh;
      }
      .aNum {
        position: absolute;
        color: #fff;
        text-align: center;
        width: 100%;
      }
    }
  }

  .comment {
    height: 100*@vh;
    border: 1px solid #f1f1f1;
    border-radius: 100%;
    input {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 40*@vh;
      line-height: 40*@vh;
      border-radius: 20%;
      padding: 10*@vh;
    }
  }
</style>
