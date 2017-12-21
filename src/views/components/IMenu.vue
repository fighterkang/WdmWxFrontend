<template>
  <div class="iMenu-container" v-show="iMenuData.show" @click="closeMenuFn">
    <div class="iMenu-content" ref="iMenu">
      <div class="head box">
        <div class="box box-wrap box-item box-col-flex" v-for="(item, key) of headArr" :key="key" @click="jumpPage(item.handle)">
          <img :src="item.img" :alt="item.text"/>
          <div class="box box-item">{{ item.text }}</div>
        </div>
      </div>
      <div class="content">
        <div class="label box box-y-center">
          <div/>家园共育
        </div>
        <div class="half-x-line"/>
        <ul class="box box-wrap">
          <li class="box box-wrap box-item" v-for="i in 8" :key="i" @click="jumpPage('Home')">
            <img src="static/icon2/ic_book.png" alt="book"/>
            <div class="box box-item">家长学习</div>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="label box box-y-center">
          <div/>育儿心经
        </div>
        <div class="half-x-line"/>
        <ul class="box box-wrap">
          <li class="box box-wrap box-item" v-for="i in 4" :key="i" @click="jumpPage('Home')">
            <img src="static/icon2/ic_book.png" alt="book"/>
            <div class="box box-item">家长学习</div>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="label box box-y-center">
          <div/>家长课堂
        </div>
        <div class="half-x-line"/>
        <ul class="box box-wrap">
          <li class="box box-wrap box-item" v-for="i in 4" :key="i" @click="jumpPage('Home')">
            <img src="static/icon2/ic_book.png" alt="book"/>
            <div class="box box-item">家长学习</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      headArr: [
        {
          text: '发布帖子',
          img: 'static/icon2/ic_work.png',
          handle: 'Post',
        },
        {
          text: '我的发布',
          img: 'static/icon2/ic_submit.png',
          handle: 'Published',
        },
        {
          text: '首页',
          img: 'static/icon2/sub_Home_active.png',
          handle: 'Forum',
        },
        {
          text: '我的回复',
          img: 'static/icon2/ic_news.png',
          handle: 'Reply',
        },
        {
          text: '我的收藏',
          img: 'static/icon2/ic_rec.png',
          handle: 'Collect',
        },
      ],
    }
  },
  computed: {
    ...mapState(['iMenuData']),
  },
  methods: {
    closeMenuFn() {
      this.$store.dispatch('ToggleIMenuData', { show: false })
    },
    jumpPage(name) {
      if (name === 'Forum') {
        this.closeMenuFn()
        return
      }
      this.$Helper.jumpPage({ name }, this)
    },
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.iMenu)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../theme/index.less";
/*定义自定义样式*/

.iMenu-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  .iMenu-content {
    background: @bgColor;
    width: 90vw;
    height: 65vh;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    overflow-x: hidden;
    overflow-y: auto;
    .head{
      height: 12vh;
      background: white;
      &>div{
        height: 100%;
        // border:1px solid red;
        &>img{
          width:36%;
          margin-top: 2.5vh;
          margin-bottom: 1vh;
        }
        &>div{
          font-size: 3.2vw;
          color:@fontColor3;
          width: 100%;
        }
      }
    }
    .content{
      margin-top: 1vh;
      background: white;
      .label{
        height: 6.3vh;
        font-size: 4vw;
        padding: 0 6vw;
        font-weight: 400;
        &>div{
          height:2vh;
          width:0.5vh;
          background: #23ae92;
          margin-right:1vw;
        }
      }
      ul{
        li{
          height: 7.6vh;
          width:25%;
          // border:1px solid red;
          &>img{
            width:25%;
            margin-top: 1vh;
            margin-bottom: 0.5vh;
          }
          &>div{
            font-size: 3vw;
            color:@fontColor3;
            width: 100%;
          }
        }
      }
    }
  }
}

</style>
