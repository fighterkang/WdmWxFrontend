<template lang="html">
  <transition name="fade">
    <div class="layer container box box-item" @click="close" :style="{ backgroundImage: `url('${imagepreview.image}')` }" v-if="imagepreview.show"></div>
  </transition>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // image: '@/headImage0.jpeg',
    }
  },
  computed: {
    ...mapState(['imagepreview']),
  },
  methods: {
    close() {
      this.$store.dispatch('PreviewImage', {
        show: false,
        image: null,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color:black;
  background-repeat:no-repeat;
  background-position:center center;
  background-size: 100% auto;   
  transition: all .2s linear;
}
</style>
