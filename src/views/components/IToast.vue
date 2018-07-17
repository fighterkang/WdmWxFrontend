<template lang="html">
  <transition name="fade">
    <div class="layer container box" v-if="show">
      <span class="toast-container box box-item" :class="{large: text.length> 10}">
        {{ text }}
      </span>
    </div>
  </transition>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState('itoast', [
      'text',
      'show',
    ]),
  },
  methods: {
  },
  mounted() {
    console.log('this.itoast')
    console.log(this.itoast)
  },
}
</script>

<style lang="less" scoped>
@import "../../theme/index.less";
.container {
  background: rgba(0,0,0,0);
  transition: all .2s linear;
  pointer-events: none;
  text-align: center;
  position: fixed;
  top:0;
  z-index: 1000;
}

.toast-container{
  background-color: rgba(0,0,0,0.8);
  color:white;
  font-size: 4vw;
  max-width: 75vw;
  text-align: center;
  margin:auto;
  margin-top:25vh;
  padding:2vw;
  border-radius: 0.5vw;
  // line-height: 1.5;
}
</style>
