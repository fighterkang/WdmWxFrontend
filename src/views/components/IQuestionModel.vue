<template>
  <div class="container" v-if="questionModelData.show" @click="hideModel()">
    <div class="content" @click.stop>
      <div class="icoBox" @click="randomPractice">
        <img src="../../../static/icon/ic_pen@2x.png" alt="" class="oImg">
        <div>随机练习</div>
      </div>
      <div class="icoBox" @click="orderPractice">
        <img src="../../../static/icon/ic_time@2x.png" alt="" class="oImg">
        <div>顺序练习</div>
      </div>
      <div class="icoBox" @click="getErrorTitle">
        <img src="../../../static/icon/ic_book@2x.png" alt="" class="oImg">
        <div>错题集锦</div>
      </div>
    </div>
    <IQuestionModel2/>
  </div>
</template>
<script>
  import IQuestionModel2 from '../components/IQuestionModel2.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      IQuestionModel2,
    },
    data() {
      return {}
    },
    computed: {...mapState(['questionModelData'])},
    watch: {},
    methods: {
      hideModel() {
        this.$store.dispatch('toggleQuestionModel', {
          show: false,
        })
      },
      randomPractice() {
        this.$store.dispatch('toggleQuestionModel2', {
          show: true,
        })
      },
      orderPractice() {
        console.log('顺序联系')
//        this.$store.dispatch('toggleQuestionModel2', {
//          show: true,
//        })
      },
      getErrorTitle() {
        console.log('错题集')
//        this.$store.dispatch('toggleQuestionModel2', {
//          show: true,
//        })
      },
    },
    created() {
    },
    mounted() {
    },
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    .content {
      padding: 90*@vh;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 300*@vh;
      border-radius: 20*@vh 20*@vh 0 0;
      background: #fff;
      font-size: 30*@vh;
      color: #000;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .icoBox {
        float: left;
        .oImg {
          width: 66*@vh;
          height: 66*@vh;
          margin-bottom: 20*@vh;
        }
      }
    }
  }
</style>
