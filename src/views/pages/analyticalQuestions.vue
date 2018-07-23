<template>
  <div class="container">
    <header class="aType">简答题</header>
    <section>
      <h3 class="aQuestion">{{listData[currentIndex].title}}</h3>
      <div v-if="initData.type == 2">
        <h3 class="answer">答案</h3>
        <div class="answerDetail">
          {{listData[currentIndex].answer}}
        </div>
        <h3 class="analysis">解析：</h3>
        <div class="analysisDetail">
          {{listData[currentIndex].suggesstion}}
        </div>
      </div>
    </section>
    <footer>
      <button @click="nextQ()">下一题</button>
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
        listData: [{}],
        currentIndex: 0,
        initData: JSON.parse(localStorage.getItem('questionInfo')),
      }
    },
    computed: {},
    watch: {},
    methods: {
      nextQ() {
        if (!this.listData[++this.currentIndex]) {
          this.$Helper.message.toast({long: 2000, text: '暂无更多内容'})
          this.currentIndex--
        }
      },
    },
    created() {
    },
    mounted() {
      this.currentIndex = 0
      let oUrl
      if (this.initData.practiceType === 'random') {
        oUrl = 'examCenter/randomPractice?ThirdClassId=5'
      } else {
        oUrl = 'examCenter/orderPractice?ThirdClassId=' + this.initData.pId + '&titleId=' + this.initData.startPointId
      }
      this.$Helper.ajax({
        url: oUrl,
        method: 'GET',
      }).then(
        (res) => {
          if (res.data) {
            this.listData = res.data
          } else {
            this.$Helper.message.toast({
              text: res.message,
              long: 2000,
              fn: () => {
                this.$Helper.jumpPage({name: 'ExamClassThree'}, this)
              },
            })
          }
        },
        () => {
        }
      )
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
    button {
      border: none;
      outline: none;
    }
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
