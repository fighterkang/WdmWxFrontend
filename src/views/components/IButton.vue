<template>
  <div class="btn box box-item" :class="{touching: touching}" :data-type="type" :data-size="size" @touchstart.stop.prevent="touchstart" @touchend="touchend">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touching: false,
    }
  },
  props: ['type', 'size'],
  computed: {
  },
  methods: {
    touchstart() {
      this.touching = true
      this.$emit('clickFn')
    },
    touchend() {
      this.touching = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../theme/index.less';
.btn {
  height: 10vw;
  border-radius: 10vw;
  padding: 0 6vw;
  font-size: 4vw;
  border: 1px solid @activeFontColor;
  color: @activeFontColor;
  position: relative;
  overflow: hidden;
  &[data-type="primary"] {
    background: @activeFontColor;
    color: white;
  }
  &[data-size="small"] {
    height: 8vw;
    border-radius: 8vw;
    padding: 0 4vw;
    font-size: 4vw;
  }
  &.touching:before{
    content: '';
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    background:rgba(0,0,0,.2);
    // opacity:0.5;
  }
}

// .btn[data-type="primary"] {
//   background: @activeFontColor;
//   color: white;
// }
</style>
