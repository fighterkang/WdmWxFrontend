<template lang="html">
  <input :class="classList" :style="styleList" :type="inputType" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder"/>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      pageHeight: null,
    }
  },
  computed: {},
  props: {
    inputType: {
      type: String,
      default: 'input',
    },
    value: {
      default: null,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    classList: {
      type: Object,
      default: () => {
        return {}
      },
    },
    styleList: {
      type: Object,
      default: () => {
        return {}
      },
    },
    container: {
      type: String,
    },
    fixHeight: {
      type: Boolean,
      default: true,
    },
  },
  watch: {},
  methods: {
    focus(e) {
      if (this.$Helper.isAndroid() && this.fixHeight) {
        let offsetTop = this.getTop(e.target)
        let top = offsetTop > this.pageHeight * 0.4 ? this.pageHeight * 0.4 : offsetTop
        let container = document.getElementById(this.container) || document.body
        container.style.height = this.pageHeight + 'px'
        container.style.top = -top + 'px'
        setTimeout(() => {
          let blur = () => {
            e.target.blur()
            window.removeEventListener('resize', blur, false)
          }
          window.addEventListener('resize', blur, false)
        }, 1000)
      }
    },
    blur(e) {
      if (this.$Helper.isAndroid() && this.fixHeight) {
        let container = document.getElementById(this.container) || document.body
        container.style.top = 0
      }
    },
    getTop(e) {
      let offset = e.offsetTop
      if (e.offsetParent != null) offset += this.getTop(e.offsetParent)
      return offset
    },
  },
  mounted() {
    // save body height
    this.pageHeight = document.body.offsetHeight
  },
}
</script>

<style lang="less" scoped>
  @import '../../theme/index.less';
</style>
