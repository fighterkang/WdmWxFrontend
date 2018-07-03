<template>
  <div class="container">
    <IExamHead/>
    <IExamQuestionType v-for="(item, key) in listData" :initData="item" :skipUrl="skipUrl" :key="key"/>
    <div class="oTest" @click="directTest">直接考试</div>
  </div>
</template>
<script>
  import IExamHead from '../components/IExamHead'
  import IExamQuestionType from '../components/IExamQuestionType'

  export default {
    components: {
      IExamHead,
      IExamQuestionType,
    },
    data() {
      return {
        listData: [],
        skipUrl: 'ExamClassThree',
        pId: -1,
      }
    },
    computed: {},
    watch: {},
    methods: {
      directTest() {
        this.$Helper.message.toast({ text: 'token获取失败', long: 2000 })
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
    },
  }
</script>
<style lang="less">
  @import url('../../theme/index.less');

  .container {
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    height: 100%;
    .oTest {
      position: absolute;
      width: 630*@vh;
      height: 100*@vh;
      background: #12af72;
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
</style>
