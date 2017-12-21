<template lang="html">
  <div class="s-container">
    <div class="s-title box box-y-center overtext">
      <div class="overtext">如果孩子想干嘛就干嘛，还要父母做什么？如果孩子想干嘛就干嘛，还要父母做什么？</div>
      <div class="auther box box-y-center" v-if="$route.name!=='Forum'">微笑天使</div>
    </div>
    <div class="s-content" v-if="$route.name!=='Collect'">
      <div class="decoration overtext">
        作为父母，我们也许天生本能就有一种责任感，让我们不能对孩子不管不顾
      </div>
      <div class="image-container box box-space-bettwen">
        <img src="static/slider/0.jpg" v-for="i in 4"/>
      </div>
    </div>
    <div class="s-bottom box" :style="{ marginTop: $route.name==='Collect' ? '2vh' : 0 }">
      <div class="auther box box-y-center" v-if="$route.name==='Forum'">发表人：微笑天使</div>
      <div class="date box box-y-center">2017-12-10 09:23</div>
      <slot/>
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
    }
    .s-content{
      padding: 1vw 0;
      font-size: 3vw;
      color: @fontColor4;
      .image-container{
        height: 10vh;
        padding: 1.5vh 0;
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
