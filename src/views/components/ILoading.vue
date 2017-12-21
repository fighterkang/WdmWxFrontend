<template>
  <div class="loading-container" v-show="loadingData.show">
    <div class="loading-content">
      <div class="loader">
        <div class="loader-inner ball-clip-rotate-pulse">
          <div></div>
          <div></div>
        </div>
        <div class="loading-text">{{ loadingData.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['loadingData']),
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../theme/index.less";
/*定义自定义样式*/

.loading-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.loading-content {
  background: white;
  width: 30vw;
  height: 32vw;
  position: absolute;
  top: 60vw;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 3px;
}

.loading-text {
  text-align: center;
  font-size: 3vw;
  color: #666;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5vw;
}

.ball-clip-rotate-pulse {
  position: relative;
  top: 6vw;
  margin: auto;
  text-align: center;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.ball-clip-rotate-pulse>div {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 100%;
}

.ball-clip-rotate-pulse>div:first-child {
  background: @activeFontColor;
  height: 16px;
  width: 16px;
  top: 7px;
  left: 0;
  -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
}

.ball-clip-rotate-pulse>div:last-child {
  position: absolute;
  border: 1px solid @activeFontColor;
  width: 30px;
  height: 30px;
  background: transparent;
  border: 1px solid;
  border-color: @activeFontColor transparent @activeFontColor transparent;
  -webkit-animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes scale {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
</style>
