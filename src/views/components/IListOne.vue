<template lang="html">
  <div class="s-container" @click="getDetail">
    <div class="s-title box box-y-center overtext">
      <div class="overtext">{{ basicData.consultName }}</div>
      <div class="auther box box-y-center" v-if="$route.name!=='Forum'">{{ basicData.nickName }}</div>
    </div>
    <div class="s-content box" v-if="$route.name!=='Collect'">
      <div class="decoration overtext3 box-col-flex">
        {{ $Helper.cuteText($Helper.htmlToText(basicData.consultDetail)) }}
      </div>
      <div class="image-container box box-item">
        <img :src="basicData.consultImg" v-if="basicData.consultImg"/>
      </div>
    </div>
    <div class="s-bottom box" :style="{ marginTop: $route.name==='Collect' ? '2vh' : 0 }">
      <div class="auther box box-y-center" v-if="$route.name==='Forum'">发表人：{{ basicData.nickName }}</div>
      <div class="date box box-y-center">{{ $Helper.formatTime(basicData.createTime) }}</div>
      <slot/>
    </div>
  </div>
</template>
<script>
import Router from '@/router'
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
  },
  computed: {},
  watch: {},
  methods: {
    getDetail() {
      Router.push({ name: 'PostDetail', params: { basicData: this.basicData }, query: { id: this.basicData.id } })
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
    padding:3vw;
    margin-bottom:1vh;
    .s-title{
      height: 5vh;
      font-size: 4.3vw;
      color: @fontColor2;
      font-weight: 500;
      .auther{
        margin-left:5vw;
        font-size: 3.5vw;
        color: @fontColor4;
      }
    }
    .s-content{
      padding: 1vw 0;
      font-size: 3.5vw;
      color: @fontColor3;
      height: 10vh;
      .decoration{
        height: 90%;
        word-break: break-all;
        text-align: justify;
        margin-right: 3vw;
        overflow: hidden;//必须
        display: -webkit-box;//必须
        -webkit-line-clamp: 2;//必须
        -webkit-box-orient: vertical;//必须
      }
      .image-container{
        height: 100%;
        padding: 1vh 0;
        img{
          height: 100%;
        }
      }
    }
    .s-bottom{
      height: 3vh;
      font-size: 2.8vw;
      color: @fontColor4;
      font-weight: 300;
      &>div{
        height: 100%;
        // border: 1px solid red;
      }
      .auther{
        margin-right:3vw;
      }
      .date{
  
      }
    }
  }
</style>
