<template>
  <div class="container">
    <IExamHead/>
    <IExamBody/>
  </div>
</template>
<script>
  import IExamHead from '../components/IExamHead'
  export default {
    components: {
      IExamHead,
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
      this.$Helper.ajax({
        url: 'open/examCenter/getOneClass',
        method: 'GET',
//        params: { phone: this.rigster.phone },
      }).then(
        () => {
          this.$message({
            type: 'success',
            message: '验证码发送成功，请注意查收',
          })
          this.isCodeWaiting = true
          this.codeLeftSecond = 60
          this.beginTimer()
        },
        () => {
          this.$message({
            type: 'warning',
            message: '验证码获取失败',
          })
        }
      )
    },
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container{
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
