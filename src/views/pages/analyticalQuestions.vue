<template>
  <div class="container">
    <header class="aType">简答题</header>
    <section>
      <h3 class="aQuestion">1、建立合理的生活制度可以培养幼儿哪种习惯？</h3>
      <div v-if="initData.type == 2">
        <h3 class="answer">答案</h3>
        <div class="answerDetail">
          建立合理的生活制度可以培养幼儿哪种习惯
          建立合理的生活制度可以培养幼儿哪种习惯
          建立合理的生活制度可以培养幼儿哪种习惯
        </div>
        <h3 class="analysis">解析：</h3>
        <div class="analysisDetail">
          这是解析这是解析
          这是解析这是解析
          这是解析这是解析
          这是解析这是解析
        </div>
      </div>
    </section>
    <footer>
      <button>下一题</button>
    </footer>
  </div>
</template>
<script>
  import Iinput from '../components/Iinput.vue'

  export default {
    components: {
      Iinput,
    },
    data() {
      return {
        test: {
          a: '123',
        },
        initData: {
//       type   1:单选 2:多选
          type: 2,
        },
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
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
    padding: 0 40*@vh;
    .aType {
      font-size: 36*@vh;
      font-weight: 700;
      margin: 60*@vh 0;
    }
    .aQuestion {
      margin-bottom: 60*@vh;
    }
    .answer {
      color: #515151;
    }
    .answerDetail {
      font-size: 34*@vh;
      line-height: 70*@vh;
      color: #000;
    }
    .analysisDetail {
      font-size: 34*@vh;
      line-height: 70*@vh;
      color: #000;
    }
    footer {
      position: absolute;
      bottom: 60*@vh;
      right: 40*@vh;
      button {
        display: flex;
        float: left;
        justify-content: space-around;
        font-size: 32*@vh;
        background: #2ead92;
        border-radius: 40*@vh;
        width: 200*@vh;
        height: 76*@vh;
        color: #fff;
      }
    }
  }
</style>
