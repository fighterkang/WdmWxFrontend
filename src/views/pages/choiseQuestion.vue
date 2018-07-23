<template>
  <div class="container">
    <div class="theChoice">
      <header class="aType">单选题</header>
      <section>
        <h3 class="aQuestion">{{listData[currentIndex].title}}</h3>
        <div>
          <div class="customCheckbox" :class="{active: currentAnswer === 'A'}"
               v-if="JSON.parse(listData[currentIndex].allAnswer).A" @click="changeAnswer('A')"><span
            class="oCheck"><b>A</b><span class="oClass">{{JSON.parse(listData[currentIndex].allAnswer).A}}</span></span>
          </div>
          <div class="customCheckbox" :class="{active: currentAnswer === 'B'}"
               v-if="JSON.parse(listData[currentIndex].allAnswer).B" @click="changeAnswer('B')"><span
            class="oCheck"><b>B</b><span class="oClass">{{JSON.parse(listData[currentIndex].allAnswer).B}}</span></span>
          </div>
          <div class="customCheckbox" :class="{active: currentAnswer === 'C'}"
               v-if="JSON.parse(listData[currentIndex].allAnswer).C" @click="changeAnswer('C')"><span
            class="oCheck"><b>C</b><span class="oClass">{{JSON.parse(listData[currentIndex].allAnswer).C}}</span></span>
          </div>
          <div class="customCheckbox" :class="{active: currentAnswer === 'D'}"
               v-if="JSON.parse(listData[currentIndex].allAnswer).D" @click="changeAnswer('D')"><span
            class="oCheck"><b>D</b><span class="oClass">{{JSON.parse(listData[currentIndex].allAnswer).D}}</span></span>
          </div>
        </div>
      </section>
    </div>
    <div class="theAnswer" v-if="showAnswer">
      <div class="oAnswer">答案：{{listData[currentIndex].trueAnswer}}</div>
      <div class="oDetail">
        <h3>解析：</h3>
        <div>
          {{listData[currentIndex].suggesstion}}
        </div>
      </div>
    </div>
    <footer v-if="currentAnswer">
      <button @click="toggleShow()">解  析</button>
      <button @click="nextQ()">下一题</button>
    </footer>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Iinput from '../components/Iinput.vue'

  export default {
    components: {
      Iinput,
    },
    data() {
      return {
        initData: JSON.parse(localStorage.getItem('questionInfo')),
        listData: [{}],
        currentIndex: 0,
        currentAnswer: '',
        showAnswer: false,
      }
    },
    computed: {...mapState(['currentClass3Id'])},
    watch: {},
    methods: {
      nextQ() {
        if (this.listData[++this.currentIndex]) {
          this.currentAnswer = ''
          this.showAnswer = false
        } else {
          this.$Helper.message.toast({long: 2000, text: '暂无更多内容'})
          this.currentIndex--
        }
      },
      changeAnswer(data) {
        if (!this.currentAnswer) {
          this.currentAnswer = data
          if (this.currentAnswer !== this.listData[this.currentIndex].trueAnswer) {
            this.$Helper.ajax({
              url: 'examCenter/addErrorTitle?titleId=' + this.listData[this.currentIndex].id + '&modelType=1',
              method: 'GET',
            }).then(
              (res) => {
              },
              () => {
              }
            )
          }
        }
      },
      toggleShow() {
        this.showAnswer = !this.showAnswer
      },
    },
    created() {
    },
    mounted() {
      this.currentIndex = 0
      let oUrl
      if (this.initData.practiceType === 'random') {  // 随机
        oUrl = 'examCenter/randomPractice?ThirdClassId=4'
      } else if (this.initData.practiceType === 'order') { // 顺序
        oUrl = 'examCenter/orderPractice?ThirdClassId=' + this.initData.pId + '&titleId=' + this.initData.startPointId
      } else { // 错题
        oUrl = 'examCenter/getErrorTitle?ThirdId=' + this.currentClass3Id + '&updateTime=' + new Date().getTime()
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
    button {
      margin-right: 20*@vh;
      border: none;
      outline: none;
    }
    .theChoice {
      background: #fff;
      padding: 60*@vh 40*@vh;
      .aType {
        font-size: 36*@vh;
        font-weight: 700;
        margin-bottom: 60*@vh;
      }
      .aQuestion {
        font-size: 34*@vh;
        line-height: 60*@vh;
        font-weight: 700;
        margin-bottom: 68*@vh;
      }
      .customCheckbox {
        margin-bottom: 100*@vh;
        font-size: 34*@vh;
        .oCheck {
          b {
            display: inline-block;
            font-size: 20*@vh;
            width: 36*@vh;
            height: 36*@vh;
            line-height: 32*@vh;
            background: #fff;
            color: #000;
            text-align: center;
            border-radius: 50%;
            margin-right: 30*@vh;
            border: 1px solid #000;
          }
          .oClass {
            vertical-align: middle;
          }
        }
        &.active {
          .oCheck {
            b {
              background: #2ead92;
              color: #fff;
              border: none;
            }
          }
        }
      }
    }
    .theAnswer {
      padding: 70*@vh 40*@vh;
      background: #fff;
      margin-top: 20*@vh;
      font-size: 30*@vh;
      color: #515151;
      .oAnswer {
        color: #000;
        margin-bottom: 40*@vh;
      }
      .oDetail {
        h3 {
          margin-bottom: 30*@vh;
        }
      }
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
