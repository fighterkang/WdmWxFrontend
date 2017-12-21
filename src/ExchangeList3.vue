<template lang="html">
  <div class="container" ref="exchangelist">
    <IListOne v-for="(item,key) in list" :key="key" :data="item"/>
    <div class="box box-item load-more" :class="{middle: !(list && list.length > 0)}" @click="loadmoreFn">
      <span v-if="loadmore===0">点击加载更多</span>
      <span v-if="loadmore===1">正在加载...</span>
      <span v-if="loadmore===2">暂无更多内容</span>
    </div>
  </div>
</template>
<script>
// import router from '@/router'
import IListOne from '../components/IListOne'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  components: {
    IListOne,
  },
  data() {
    return {
      list: [],
      start: 0,
      page: 1,
      loadmore: 0,  // 0还有更多1正在加载2暂无更多
    }
  },
  computed: {
    ...mapState(['exchangeListData', 'gameListData']),
    from() {
      return this.$route.name === 'ExchangeList' ? 1 : 2
    },
  },
  watch: {
    from() {
      this.start = 0
      this.page = 1
      this.list = []
      this.initData()
    },
  },
  methods: {
    loadList(_fun) {
      this.$Helper.ajax(
        {
          url: 'Open.MicroblogList',
          params: {
            start: this.start,
            page: this.page,
            from: this.from,
          },
          success: ({ data }) => {
            let { list, start } = data
            this.loadmore = list === -1 ? 2 : 0
            if (list === -1) {
              this.$Helper.message.toast({ text: '暂无更多列表数据', long: 2000 })
            } else {
              this.list = this.list.concat(list)
            }
            this.start = start
            this.page++
            // 更新缓存数据
            this.$store.dispatch(this.from === 1 ? 'setExchangeListData' : 'setGameListData', { list: this.list, start: this.start, page: this.page, loadmore: this.loadmore })
            this.$Helper.message.loading({
              show: false,
            })
            if (_fun) _fun()
          },
        }
      )
    },
    initData() {
      let listData = this.from === 1 ? this.exchangeListData : this.gameListData
      if (_.isEmpty(listData)) {
        this.loadList(() => {
          this.scrollTo(10)
        })
      } else {
        this.list = listData.list
        this.start = listData.start
        this.page = listData.page
        this.loadmore = listData.loadmore
        this.scrollTo(this.$Helper.getCookie(this.$route.name + 'ScrollTop') || 10)
        this.$Helper.message.loading({
          show: false,
        })
      }
    },
    scrollTo(data) {
      setTimeout(() => {
        this.$refs.exchangelist.scrollTop = data
      }, 0)
    },
    loadmoreFn() {
      if (this.loadmore === 0) {
        this.loadmore = 1
        this.loadList()
      } else if (this.loadmore === 2) {
        this.$Helper.message.toast({ text: '暂无更多列表数据', long: 2000 })
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$Helper.setCookie(this.$route.name + 'ScrollTop', this.$refs.exchangelist.scrollTop)
    next()
  },
  created() {
    if (_.get(this, '$route.params.reload')) {
      this.start = 0
      this.page = 1
      this.list = []
      this.loadList()
    } else {
      this.initData()
    }
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.exchangelist)
  },
}
</script>

<style lang="css" scoped>
.container {
  background: #f3f3f3;
  overflow-x: hidden;
   overflow-y: auto; 
}

.load-more {
  height: 8vw;
  margin-bottom: 1.6vh;
  font-size: 4vw;
  color: #2c3e50;
}

.load-more.middle {
  margin-top: 30vh;
}
</style>
