<template lang="html">
  <div class="container">
    <ul class="scroll-list box" ref="scroll_list">
      <li class="box box-item" :class="{active: activeClassId === item.id}" v-for="(item, key) of tagArr" :key="key" @click="setSubActive(item.id, true)">
        {{ item.consultClassName }}
      </li>
    </ul>
    <div class="half-x-line"/>
    <IDetailContent @scrollToBottom="scrollToBottom">
      <IListOne v-for="(item, key) in newList" :basicData="item" :key="key"/>
    </IDetailContent>
  </div>
</template>
<script>
import IListOne from '../components/IListOne'
import IDetailContent from '../components/IDetailContent'
export default {
  components: {
    IListOne,
    IDetailContent,
  },
  data() {
    return {
      activeClassId: null,
      tagArr: [],
      newList: [],
      page: 1,
    }
  },
  computed: {},
  watch: {},
  methods: {
    setSubActive(item, clear = false) {
      this.activeClassId = item
      this.$Helper.setCookie('activeClassId', { active: item })
      this.page = 1
      this.newList = []
      this.getNewList(true)
    },
    publishFn() {},
    removeTaskImage() {
      this.task.imgUrl = null
    },
    getTagArr() {
      this.$Helper.ajax({
        url: 'WeOpen.ConsultClassList',
        urlType: 'bbs',
        method: 'GET',
      }).then(
        ({data}) => {
          this.tagArr = data.data
          if (!this.activeClassId) this.setSubActive(this.tagArr[0].id)
        },
      )
    },
    getNewList(reset = false) {
      this.fetched = true
      this.$Helper.ajax({
        url: 'WeOpen.ConsultList',
        method: 'GET',
        urlType: 'bbs',
        params: {
          page: this.page,
          classId: this.activeClassId,
        },
      }).then(
        ({data}) => {
          this.newList = (reset ? [] : this.newList).concat(data.data)
          // this.hotList = data.data
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
    scrollToBottom() {
      if (!this.fetched) this.getNewList()
    },
  },
  created() {
    this.getTagArr()
  },
  mounted() {
    this.$refs.scroll_list.addEventListener('touchmove', (evt) => {
      evt._isScroller = true
    })
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container {
    background: #f1f1f1;
    ul{
      background: white;
      overflow-x: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        background: transparent;
        height: 0;
      }
      li{
        padding:0 7vw;
        height: 6vh;
        font-size: 3.5vw;
        color:#555;
        border-bottom: 2px solid transparent;
        &.active{
          color:@activeColor;
          border-color:@activeColor;
        }
      }
    }
  }
</style>
