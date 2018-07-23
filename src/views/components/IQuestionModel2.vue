<template>
  <div class="container" v-if="questionModel2Data.show" @click="hideModel()" :class="{ active: isActive }">
    <div class="content" @click.stop>
      <div class="testChoice" @click="continuePractice()">继续上次练习</div>
      <div class="testChoice" @click="restartPractice()">重新开始练习</div>
      <div class="practicePoint" @click="toActive()">
        设置练习起点
        <div class="pointIptBox">
          题号: <input type="text" class="pointIpt" v-model="oPoint" v-limitNum/>
        </div>
        <div class="oBtnBox" @click.stop>
          <span class="oBtn" @click="outActive()">取消</span>
          <span class="oBtn" @click="makeSure()">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    components: {
//      IDetailOne
    },
    data() {
      return {
        isActive: false,
        oPoint: '',
      }
    },
    computed: {...mapState(['questionModel2Data', 'questionModelData'])},
    watch: {},
    methods: {
      hideModel() {
        this.$store.dispatch('toggleQuestionModel2', {
          show: false,
        })
      },
      toActive() {
        this.isActive = true
      },
      outActive() {
        this.isActive = false
      },
      makeSure() {
        if (this.oPoint) {
          let skipUrl = this.questionModelData.questionType === 1 ? 'choiseQuestion' : 'analyticalQuestions'
          this.$Helper.jumpPage({name: skipUrl}, this)
          localStorage.setItem('questionInfo', JSON.stringify({
            startPointId: this.oPoint,
            pId: localStorage.getItem('ExamClassThreePId'),
            type: this.questionModelData.questionType,
            practiceType: 'order',
          }))
        } else {
          this.$Helper.message.toast({text: '请选择练习起点', long: 2000})
        }
      },
      continuePractice() {
        let skipUrl = this.questionModelData.questionType === 1 ? 'choiseQuestion' : 'analyticalQuestions'
        this.$Helper.jumpPage({name: skipUrl}, this)
        localStorage.setItem('questionInfo', JSON.stringify({
          startPointId: 1,
          pId: localStorage.getItem('ExamClassThreePId'),
          type: this.questionModelData.questionType,
          practiceType: 'order',
        }))
      },
      restartPractice() {
        let skipUrl = this.questionModelData.questionType === 1 ? 'choiseQuestion' : 'analyticalQuestions'
        this.$Helper.jumpPage({name: skipUrl}, this)
        localStorage.setItem('questionInfo', JSON.stringify({
          startPointId: 1,
          pId: localStorage.getItem('ExamClassThreePId'),
          type: this.questionModelData.questionType,
          practiceType: 'order',
        }))
      },
    },
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
    background: rgba(0, 0, 0, .4);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .content {
      position: absolute;
      height: 300*@vh;
      width: 452*@vh;
      background: #f1f1f1;
      border-radius: 20*@vh;
      font-size: 30*@vh;
      color: #000;
      text-align: center;
      top: 50%;
      margin-top: -150*@vh;
      left: 50%;
      margin-left: -226*@vh;
      .testChoice {
        height: 100*@vh;
        line-height: 100*@vh;
        border-bottom: 1px solid #c1c1c1;
      }
      .practicePoint {
        height: 100*@vh;
        line-height: 100*@vh;
      }
      .pointIptBox {
        display: none;
        .pointIpt {
          width: 100*@vh;
          border-bottom: 1px solid #000;
          padding: 0 20*@vh;
          box-sizing: border-box;
        }
      }
      .oBtnBox {
        display: none;
        .oBtn {
          display: inline-block;
          width: 49%;
        }
      }
    }
    &.active {
      .content {
        height: 502*@vh;
        margin-top: -251*@vh;
        .pointIptBox {
          display: block;
          border-bottom: 1px solid #c1c1c1;
        }
        .oBtnBox {
          display: block;
        }
      }
    }
  }
</style>
