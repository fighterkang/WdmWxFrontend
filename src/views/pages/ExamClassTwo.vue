<template>
  <div class="container">
    <!--<IExamHead/>-->
    <IExamBody v-for="(item, key) in listData" :initData="item" :skipUrl="skipUrl" :key="key"/>
  </div>
</template>
<script>
  import IExamHead from '../components/IExamHead'
  import IExamBody from '../components/IExamBody'

  export default {
    components: {
      IExamHead,
      IExamBody,
    },
    data() {
      return {
        listData: [],
        skipUrl: 'ExamClassThree',
        pId: -1,
      }
    },
    props: {
      classId: String,
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
      this.pId = parseInt(localStorage.getItem('ExamClassTwoPId') || -1)
      this.$Helper.ajax({
        url: 'examCenter/getSecondClass?OneClassId=' + this.pId,
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
  }
</style>
