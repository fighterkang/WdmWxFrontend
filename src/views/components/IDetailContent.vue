<template lang="html">
  <div class="idetail-container" @scroll="scroll" ref="scroll_content">
    <slot/>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      scrollTop: 0,
    }
  },
  props: {
    classList: {
      type: String,
      default: '',
    },
    styleList: {
      type: Object,
      default() {
        return {}
      },
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  watch: {},
  methods: {
    scroll(e) {
      let scrollTop = e.target.scrollTop
      this.$emit('scrolling', scrollTop)
      if (!this.noScroll && e.target.scrollTop - this.scrollTop > 0 && e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop <= 30) this.$emit('scrollToBottom')
      this.scrollTop = scrollTop
    },
    setScrollTop(scrollTop) {
      let vNode = this.$refs.scroll_content
      if (vNode) {
        vNode.scrollTop = scrollTop
      }
    },
  },
  created() {
    // setTimeout(() => { this.setScrollTop(200) }, 2000)
  },
  mounted() {
    this.$Helper.overScroll(this.$refs.scroll_content)
  },
  beforeDestroy() {
    this.$emit('scrollDestory', this.scrollTop)
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .idetail-container{
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    width: 100%;
  }
</style>
