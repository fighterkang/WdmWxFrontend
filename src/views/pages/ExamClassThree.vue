<template>
  <div class="container">
    <IExamHead/>
    <IExamBody v-for="(item, key) in listData" :initData="item" :skipUrl="skipUrl" :key="key"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
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
      }
    },
    computed: {...mapState(['currentClass'])},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
      this.$Helper.ajax({
        url: 'examCenter/getThirdClass?SecondClassId=' + this.currentClass.ExamClassThreePId,
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
