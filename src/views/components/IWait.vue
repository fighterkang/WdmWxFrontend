<template>
  <div class="iwait-container" v-show="iwaitData.show">
    <div class="iwait-content box box-item" :style="{top: iwaitData.top + top + 'px', opacity: 0.2 + iwaitData.top/50}">
      <div class="loader-inner ball-clip-rotate">
        <div :style="{animationDuration: 1.15 - iwaitData.top/70 + 's'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      top: 10,
      // iwaitData: {
      //   show: true,
      //   top: 50,
      // },
    }
  },
  computed: {
    ...mapState(['iwaitData']),
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../theme/index.less';

.iwait-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: none;
  z-index: 10;
  .iwait-content {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 38px;
    height: 38px;
    background: white;
    border-radius: 100%;
    box-shadow: 0 0 10px #bbb;
  }
  pointer-events: none;
}
.ball-clip-rotate{
  height: 30px;
  width: 30px;
}

.ball-clip-rotate>div {
  border-radius: 100%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  border: 2px solid @activeFontColor;
  border-bottom-color: transparent;
  height: 100%;
  width: 100%;
  background: transparent !important;
  // display: inline-block;
  // -webkit-animation: rotate 0.75s linear infinite;
  // animation: rotate 0.75s linear infinite;
  -webkit-animation-timing-function: linear;
  // -webkit-animation-duration: 0s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  animation-timing-function: linear;
  // animation-duration: 0s;
  animation-name: rotate;
  animation-iteration-count:infinite;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(1);
    transform: rotate(180deg) scale(1);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

@keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
