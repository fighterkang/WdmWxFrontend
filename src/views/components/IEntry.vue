<template lang="html">
  <div class="container">
    <div class="layer" @click.self="hideEntry" v-show="entryData.show"/>
    <div class="e-container" :class="{ active: entryData.show }">
      <!-- <h5 class="box box-item">评论</h5> -->
      <div class="input-bac"><textarea id="Iinput" placeholder="说两句，又不要钱~" class="i-input" type="text" ref="inputText" v-model="content"></textarea></div>
      <div class="box box-item e-btn-container">
        <!-- <div class="e-btn box box-item" @click="hideEntry">
          取消
        </div>
        <div class="e-btn box box-item active" @click="submit">
          评论
        </div> -->
        <IButton  @clickFn="hideEntry">
          取消
        </IButton>
        <IButton type="primary" @clickFn="submit">
          评论
        </IButton>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
import IButton from './IButton'
export default {
  components: {
    IButton,
  },
  data() {
    return {
      content: null,
    }
  },
  computed: {
    ...mapState(['entryData']),
  },
  watch: {
  },
  methods: {
    hideEntry() {
      this.content = null
      this.$store.dispatch('ToggleEntry', {show: false, titleid: null, userId: null})
    },
    submit() {
      if (!this.content) {
        this.$Helper.message.toast({
          text: '评论不可为空',
          long: 2000,
        })
        return
      }
      this.$Helper.ajax({
        url: 'WeConsult.InsertComment',
        method: 'GET',
        urlType: 'bbs',
        params: {
          comment: this.content,
          type: 1,
          fid: this.entryData.titleid,
          pid: this.entryData.userId,
        },
      }).then(
        ({data}) => {
          let {context} = data
          this.$Helper.message.toast({
            text: context,
            long: 2000,
          })
          this.$Helper.emitAction('commentSuccess')
          setTimeout(() => this.hideEntry(), 400)
        },
        () => {
          this.$Helper.message.toast({
            text: '评论失败',
            long: 2000,
          })
        }
      )
    },
  },
  mounted() {
    // document.getElementById('Iinput').addEventListener('focus', () => {
    //   setTimeout(() => {
    //     document.getElementById('e_container').style.height = 220 + 'px'
    //   }, 20)
    // })
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.container {
}
.layer{
  background: rgba(0,0,0,0.1)
}
.e-container {
  position: absolute;
  bottom: -72vw;
  left: 0;
  right: 0;
  background: white; // transition: all .2s linear;
  padding-bottom: 3vh;
  text-align: center;
  // box-shadow: 0 -1px 6px #ddd;
  height:72vw;
  padding-top:7vw;
  z-index: 110;
  transition: all 0.4s;
  opacity: 0.5;
  h5 {
    height: 8vw;
    padding-left: 5vw;
    padding-top:5vw;
    font-size: 4.4vw;
  }
  &.active{
    bottom: 0;
    opacity: 1;
  }
}
.input-bac{
  width: 90%;
  height: 80%;
  margin: auto;
  padding-top:7.5%;
  background-image: url('../../../static/icon/ientry.png'); 
  background-repeat:no-repeat;
  background-size:100% 100%; 
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

.e-btn-container {
  // padding-right: 5vw;
  margin-top: 4%;
  .btn{
    margin:0 5vw;
  }
}

// .e-btn {
//   height:9vw;
//   width:20vw;
//   font-size: 16px;
//   color: @activeFontColor;
//   border:1px solid @activeFontColor;
//   border-radius: 9vw;
// }

// .e-btn.active {
//   color: white;
//   background: @activeFontColor;
//   margin-left: 10vw;
// }
</style>
