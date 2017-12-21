<template lang="html">
  <transition name="fade">
    <div class="layer container box box-x-center" v-if="promptData.show" @click.self="hide">
      <div class="prompt-container">
        <img :src="icon.prompt">
        <div class="input-bac"><textarea id="Iinput"  placeholder="我发现：此处有不可告人的秘密!" type="text" v-model="content"></textarea></div>
        <div class="s-btn box box-item" @click.self="submit">
          去报告
        </div>
        <!-- <h3>举报</h3>
        <textarea type="text" v-model="content" placeholder="请输入举报内容"></textarea>
        <div class="box box-item e-btn-container">
          <div class="e-btn box box-item" @click.self="hide">
            再想想
          </div>
          <div class="e-btn box box-item active" @click.self="submit">
            举报
          </div>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      content: null,
      icon: {
        prompt: 'static/icon/prompt.png',
      },
    }
  },
  computed: {
    ...mapState(['promptData']),
  },
  methods: {
    hide() {
      this.content = null
      this.$store.dispatch('TogglePrpmptData', { show: false, titleid: null })
    },
    submit() {
      if (!this.content) {
        this.$Helper.message.toast({
          text: '请输入举报内容',
          long: 2000,
        })
        return
      }
      this.$Helper.ajax({
        url: 'Open.Report',
        params: {
          microblog_id: this.promptData.titleid,
          content: this.content,
        },
        success: ({ code, context }) => {
          this.$Helper.message.toast({
            text: context,
            long: 2000,
          })
          this.hide()
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.container {
  // background: none;
  transition: all .2s linear;
  padding-top: 15vh;
}

.prompt-container {
  background: white;
  height: 100vw;
  width: 85vw;
  border-radius: 1vw;
  padding: 1vw 4vw;
  text-align: center;
  &>img {
    width: 14vw;
    margin: 0 auto;
    margin-top: 2vh;
  }
  .input-bac {
    width: 100%;
    height: 52%;
    margin: auto;
    padding-top: 9%;
    background-image: url('../../../static/icon/ientry.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    #Iinput {
      width: 100%;
      height: 95%;
      border: none;
      background: transparent;
      border-radius: 1vw;
      box-shadow: none;
      outline: none;
      font-size: 3.5vw;
      padding: 5px 6px;
      resize: none;
    }
  }
  .s-btn {
    height: 11vw;
    border-radius: 11vw;
    border: 1px solid @activeFontColor;
    color: @activeFontColor;
    width: 46%;
    margin: 9vw auto;
    font-size: 4vw;
  } // h3 {
  //   text-align: center;
  //   margin: 3% 0;
  //   width: 100%;
  //   font-size: 4.5vw;
  // }
  // textarea {
  //   width: 100%;
  //   margin: auto;
  //   height: 55%;
  //   border: none;
  //   background: none; // border-radius: 1vw;
  //   box-shadow: none;
  //   outline: none;
  //   font-size: 3.5vw;
  //   padding: 5px 6px;
  //   // border: 1px solid #ececec;
  //   background:#f8f9f9;
  //   resize: none;
  // }
  // textarea:focus {
  //   outline: none;
  //   border: 1px solid #ececec;
  // }
  // .e-btn-container {
  //   margin-top: 4vw;
  // }
  // .e-btn {
  //   width: 20vw;
  //   height: 8.5vw;
  //   font-size: 4vw;
  //   color: #7f7f7f;
  //   background: #eeeeee;
  //   border-radius: 1vw;
  // }
  // .e-btn:nth-child(1) {
  //   margin-right: 10vw;
  // }
  // .e-btn.active {
  //   color: white;
  //   background: #ff7373;
  // }
}
</style>
