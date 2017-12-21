<template lang="html">
  <div class="container" ref="detail">
    <IDetailOne v-for="i in 10" :key="i">
      {{ i }}楼
    </IDetailOne>
  </div>
</template>
<script>
import IDetailOne from '../components/IDetailOne'
export default {
  components: {
    IDetailOne,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    this.$Helper.overScroll(this.$refs.detail)
  },
}
</script>

<style lang="less" scoped>
  .container{
    @import url('../../theme/index.less');
    background: @bgColor;
    overflow-x: hidden;
    overflow-y: auto;
    .btn{
      margin-right: 2vw;
    }
  }
</style>
