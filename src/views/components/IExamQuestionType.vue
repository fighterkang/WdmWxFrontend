<template>
  <div class="container" @click="showModel">
    <img :src="initData.ico" class="oImg">
    <span class="oTitle">
      {{initData.className}}
    </span>
  </div>
</template>
<script>
  //  import IDetailOne from '../components/IDetailOne'
  export default {
    components: {
//      IDetailOne
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      skipTo() {
        localStorage.setItem(this.skipUrl + 'PId', this.initData.id)
        this.$store.dispatch('ChangeExamInfoTitle', this.initData.className)
        this.$Helper.jumpPage({name: this.skipUrl}, this)
      },
      showModel() {
        this.$store.dispatch('toggleQuestionModel', {
          show: true,
          questionType: this.initData.titleModelType,
        })
      },
    },
    created() {
    },
    mounted() {
      console.log(this.initData)
      console.log(this.skipUrl)
    },
    props: ['initData', 'skipUrl'],
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 30*@vh 30*@vh 0 30*@vh;
    height: 155*@vh;
    background: #fff;
    margin: 30*@vh 0;
    .oImg {
      width: 108*@vh;
      height: 108*@vh;
      border-radius: 50%;
      margin-right: 20*@vh;
      vertical-align: middle;
    }
    .oTitle {
      font-size: 30*@vh;
      margin-top: 20*@vh;
      color: #000;
    }
  }
</style>
