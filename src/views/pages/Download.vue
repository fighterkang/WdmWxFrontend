<template lang="html">
  <div class="container bac-image" @click="jumpPage">
    <img src="static/download.jpg" alt="a">
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    jumpPage() {
      this.$Helper.message.toast({
        text: '正在跳转到应用市场，请稍候...',
        long: 10000,
      })
      if (this.$Helper.isAndroid()) {
        window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.jiechuang.edu'
      } else {
        window.location.href = 'https://itunes.apple.com/cn/app/%E6%98%BE%E7%99%BE%E6%95%99%E8%82%B2/id1332651657?mt=8'
      }
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container {
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>
