<template>
  <div class="container" @click="showModel">
    <img :src="initData.ico" class="oImg">
    <span class="oTitle" v-if="!isTest">
      {{initData.className}}
    </span>
    <div class="oInfo" v-if="isTest">
      <span>{{initData.className}}</span>
      <span class="oCount">共{{initData.examTitleCount}}题</span>
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
      return {}
    },
    computed: {...mapState(['questionModelData'])},
    watch: {},
    methods: {
      skipTo() {
        localStorage.setItem(this.skipUrl + 'PId', this.initData.id)
        this.$store.dispatch('ChangeExamInfoTitle', this.initData.className)
        this.$Helper.jumpPage({name: this.skipUrl}, this)
      },
      showModel() {
        if (!this.isTest) {
          this.$store.dispatch('toggleQuestionModel', {
            show: true,
            questionType: this.initData.titleModelType,
          })
          this.$store.dispatch('changeClass3Id', this.initData.id)
        } else {
          // a
          let skipUrl = this.questionModelData.questionType === 1 ? 'choiseQuestion' : 'analyticalQuestions'
          this.$Helper.jumpPage({name: skipUrl}, this)
          localStorage.setItem('questionInfo', JSON.stringify({
            startPointId: 1,
            pId: localStorage.getItem('ExamClassThreePId'),
            type: this.questionModelData.questionType,
            practiceType: 'random',
          }))
        }
      },
    },
    created() {
    },
    mounted() {
      console.log('type class 3')
      console.log(this.initData)
    },
    props: ['initData', 'skipUrl', 'isTest'],
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 30*@vh;
    height: 156*@vh;
    background: #fff;
    margin: 30*@vh 0;
    .oImg {
      width: 108*@vh;
      height: 108*@vh;
      border-radius: 50%;
      margin-right: 20*@vh;
      float: left;
    }
    .oTitle {
      height: 100%;
      margin-top: 36*@vh;
      font-size: 30*@vh;
      color: #000;
      float: left;
    }
    .oInfo {
      margin-top: 20*@vh;
      display: flex;
      flex-direction: column;
      .oCount {
        font-size: 26*@vh;
        color: #b3b3b3;
      }
    }
  }
</style>
