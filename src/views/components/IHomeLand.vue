<template lang="html">
  <div class="s-container">
    <div class="s-title box box-y-center overtext">
      <div class="head box box-y-center" v-if="$route.name!=='Forum'">
        <img src="static/head.jpg">
      </div>
      <div class="overtext">如果孩子想干嘛就干嘛，还要父母做什么？如果孩子想干嘛就干嘛，还要父母做什么？</div>
      <div class="auther box box-y-center" v-if="$route.name!=='Forum'">
        <img src="static/icon2/ic_share.png">
      </div>
    </div>
    <div class="s-bottom box" :style="{ marginTop: $route.name==='Collect' ? '2vh' : 0 }">
      <div class="menu box box-y-center box-col-flex">
        <img src="static/icon2/ic_reciver.png"/> 已收藏
        <img src="static/icon2/ic_news1.png"/> 10
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
      font-size: 3.8vw;
      color: @fontColor3;
      .auther{
        margin-left:5vw;
        font-size: 3.5vw;
        color: @fontColor4;
      }
      .head{
        padding:0 2vw;
        img{
          height: 5vh;
          width:5vh;
          border-radius: 5vh;
        }
      }
      .auther{
        img{
          height: 2.5vh;
        }
      }
    }
    .s-bottom{
      height: 3vh;
      font-size: 2.8vw;
      color: @fontColor4;
      font-weight: 300;
      padding-bottom: 1vh;
      padding-top:3vh;
      &>div{
        height: 100%;
        // border: 1px solid red;
      }
      .menu{
        img{
          height: 4.5vw;
          margin-right:1vw;
          margin-left: 4vw;
        }
      }
      .auther{
        margin-right:3vw;
      }
      .date{
  
      }
    }
  }
</style>
