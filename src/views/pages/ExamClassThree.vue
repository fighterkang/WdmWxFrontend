<template>
  <div class="containerk">
    <div class="content">
      <!--<IExamHead/>-->
      <IExamQuestionType v-for="(item, key) in listData" :initData="item" :skipUrl="skipUrl" :key="key"/>
      <div class="oTest" @click="directTest">直接考试</div>
    </div>
    <IQuestionModel/>
  </div>
</template>
<script>
  import IExamHead from '../components/IExamHead'
  import IExamQuestionType from '../components/IExamQuestionType'
  import IQuestionModel from '../components/IQuestionModel'

  export default {
    components: {
      IExamHead,
      IExamQuestionType,
      IQuestionModel,
    },
    data() {
      return {
        listData: [],
        skipUrl: 'ExamQuestionPage',
        pId: -1,
      }
    },
    computed: {},
    watch: {},
    methods: {
      directTest() {
        this.$Helper.message.toast({text: '考试针对题型提交好后不可修改考试时长60分钟', long: 2000})
      },
    },
    created() {
    },
    mounted() {
      this.pId = parseInt(localStorage.getItem('ExamClassThreePId') || -1)
      this.$Helper.ajax({
        url: 'examCenter/getThirdClass?SecondClassId=' + this.pId,
        method: 'GET',
      }).then(
        (res) => {
          this.listData = res.data
        },
        () => {
        }
      )
      this.$Helper.ajax({
        url: 'examCenter/orderPractice?ThirdClassId=4&titleId=1',
        method: 'GET',
      }).then(
        (res) => {
          console.log(res.data[0].allAnswer)
        },
        () => {
        }
      )
    },
  }
</script>
<style lang="less">
  @import url('../../theme/index.less');

  .containerk {
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    .content {
      position: relative;
      height: 100%;
      .oTest {
        position: fixed;
        width: 630*@vh;
        height: 100*@vh;
        background: #12af92;
        color: #f0f0f0;
        font-size: 30*@vh;
        bottom: 30*@vh;
        border-radius: 50*@vh;
        text-align: center;
        line-height: 100*@vh;
        left: 50%;
        margin-left: -315*@vh;
      }
    }
  }
</style>
