<template lang='html'>
  <IDetailContent class='container' ref="IDetailContent" @scrollToBottom="scrollToBottom" @scrollDestory="scrollDestory">
    <div class="toper box box-y-center box-space-bettwen" :style="{ backgroundColor: `rgba(255,255,255, ${ToperOpacity})` }">
      <img src="static/icon/ic_more.png" @click="showAllClassFn"/>
      <!-- <img src="static/icon2/ic_submit.png" @click="postFn" style="height:3vh;"/> -->
      <!-- <img src="static/icon2/ic_interfice.png" @click="jumpToSearch"/> -->
    </div>
    <Slider class="slider" :pages='pages' :sliderinit='sliderinit' @slide='slide' @tap='onTap' @init='onInit'>
      <div slot='loading'></div>
    </Slider>
    <div class="label box">
      <div class="box box-y-center box-col-flex new">
        <div/>最新帖子
      </div>
      <div class="box box-item publish">
        <div class="btn box box-item" @click="postFn">
          发帖子
        </div>
      </div>
    </div>
    <div class="list-container">
      <IListOne v-for="(item, key) in newList" :basicData="item" :key="key"/>
    </div>
  </IDetailContent>
</template>
<script>
import Slider from 'vue-concise-slider'
import IListOne from '../components/IListOne'
import IDetailContent from '../components/IDetailContent'
import { mapState } from 'vuex'
export default {
  components: {
    Slider,
    IListOne,
    IDetailContent,
  },
  data() {
    return {
      ToperOpacity: 0,
      pages: [],
      sliderinit: {
        currentPage: 0,
        autoplay: 3000,
        loop: true,
        direction: 'horizontal',
        infinite: 1,
        slidesToScroll: 1,
        timingFunction: 'ease',
        duration: 300,
      },
      fetched: false,
      page: 1,
      newList: [],
      allImageData: [],
    }
  },
  computed: {
    ...mapState('basic', [
      'basic',
    ]),
  },
  watch: {},
  methods: {
    slide(data) {
      // console.log(data)
    },
    onTap({currentPage}) {
      let { id, type } = this.allImageData[currentPage]
      if (id && type) {
        this.$Helper.ajax({
          url: 'WeOpen.ConsultDetail',
          method: 'GET',
          urlType: 'bbs',
          params: {
            id,
            type,
          },
        }).then(({data}) => {
          this.$Helper.jumpPage({ name: 'PostDetail', params: { basicData: data.data } }, this)
        })
      }
    },
    onInit(data) {
      // console.log(data)
    },
    scrollFn(scrollTop) {
      this.ToperOpacity = scrollTop / 200
    },
    scrollToBottom() {
      if (!this.isFetched) this.getNewList()
    },
    scrollDestory(scrollTop) {
      // save
      this.$Helper.setCookie('ForumScrollTop', { scrollTop })
    },
    toggleMenuFn() {
      this.$store.dispatch('ToggleIMenuData', { show: true })
    },
    jumpToSearch() {
      this.$Helper.jumpPage({name: 'Search'}, this)
    },
    postFn() {
      this.$Helper.jumpPage({name: 'Post'}, this)
    },
    getNewList(reset = false) {
      this.fetched = true
      this.$Helper.ajax({
        url: 'WeOpen.ConsultList',
        method: 'GET',
        urlType: 'bbs',
        params: {
          page: this.page,
        },
      }).then(
        ({data}) => {
          this.newList = (reset ? [] : this.newList).concat(data.data)
          this.fetched = false
          if (data.data.length > 0) {
            this.page++
          } else {
            this.$Helper.message.toast({ long: 2000, text: '暂无更多内容' })
          }
        },
        () => {
          this.fetched = false
        }
      )
    },
    getBannerList() {
      this.$Helper.ajax({
        url: 'WeOpen.BannerList',
        method: 'GET',
        urlType: 'bbs',
      }).then(({data}) => {
        // console.log(data)
        this.allImageData = data.data
        this.pages = data.data.map(item => (
          {
            html: `<img src="${item.imgUrl}" style="width: 100%;height: 100%"/>`,
            style: {
              background: '#1bbc9b',
            },
          }
        ))
      })
    },
    testLogin(name = this.$route.name, jumpLogin = false) {
      this.$Helper.message.loading({
        show: true,
        text: '正在验证登录...',
      })
      this.Timer = setTimeout(() => {
        this.$Helper.message.loading({
          show: false,
        })
        this.$Helper.jumpPage({ name: 'Login' }, this)
      }, 6000)
      // [ios]bind getNativeToken to window
      window.getNativeToken = token => {
        this.tokenGetId(token)
      }
      // [android]bind nativeTokenCall to window
      window.nativeTokenCall = token => {
        this.tokenGetId(token)
      }
      if (window.android && window.android.getNativeToken) window.android.getNativeToken()
    },
    tokenGetId(token) {
      if (token) {
        this.$Helper.setCookie('basic', { ...this.basic, token })
        debugger
        this.$Helper.ajax({
          url: 'user/LtLogin',
          // urlType: 'bbs',
          method: 'GET',
        }).then(
          ({data}) => {
            this.$Helper.setCookie('basic', data)
            if (this.Timer) clearInterval(this.Timer)
            this.$Helper.message.loading({
              show: false,
            })
            this.firstGetData()
          }
        )
      } else {
        this.$Helper.message.toast({ text: 'token获取失败', long: 2000 })
      }
    },
    firstGetData() {
      // get cookie
      // let { newList, page } = JSON.parse(this.$Helper.getCookie('ForumData') || '{}')
      // let { reset } = this.$route.params
      // if (reset) {
      //   newList = []
      //   page = 1
      // }
      // this.page = page || 1
      // this.newList = newList || []
      // if (this.newList.length === 0) {
      //   this.getNewList()
      // }
      this.getNewList()
      this.getBannerList()
    },
    showAllClassFn() {
      this.$Helper.jumpPage({name: 'AllClass'}, this)
    },
  },
  created() {
    if (this.basic.id === undefined) {
      this.testLogin(this.$route.name, true)
      return
    }
    this.firstGetData()
  },
  mounted() {
    let { reset } = this.$route.params
    // get scroll top
    let scrollTop = JSON.parse(this.$Helper.getCookie('ForumScrollTop') || '{}').scrollTop
    if (scrollTop && !reset) {
      setTimeout(() => {
        this.$refs.IDetailContent.setScrollTop(scrollTop)
      }, 100)
    }
  },
  beforeDestroy() {
    this.$Helper.setCookie('ForumData', { page: this.page, newList: this.newList })
  },
}
</script>

<style lang='less' scoped>
.container {
  background: #f1f1f1;
  overflow-x: hidden;
  overflow-y: auto;
  .toper{
    position: absolute;
    top:0;
    left:0;
    right:0;
    height: 7vh;
    // border: 1px solid red;
    // background: rgba(255,255,255,0.1);
    z-index: 1;
    padding:0 3vw;
    &>img{
      &:nth-child(1) {
        height: 32%;
        // margin-right: 82vw;
      }
      &:nth-child(2) {
        height: 40%;
      }
    }
  }
  .slider{
    height: 26vh;
    opacity: 0.9;
    position: relative;
    z-index: 0;
  }
  .label{
    height: 7vh;
    font-size: 4.2vw;
    padding: 0 3vw;
    font-weight: 500;
    background: white;
    .new{
      &>div{
        height:2vh;
        width:0.7vh;
        background: #23ae92;
        margin-right:1vw;
      }
    }
    .publish{
      width: 15vw;
      .btn{
        height: 4.4vh;
        width: 15vw;
        border-radius: 4.4vh;
        line-height: 150%;
        border: 1px solid #23ae92;
        font-size: 3.4vw;
        font-weight: 600;
        color: #23ae92;
      }
    }
  }
  .list-container{
    margin-top:1vh;
  }
}
</style>
