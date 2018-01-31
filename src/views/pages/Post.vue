<template lang="html">
  <div class="container" id="postContainer">
    <div class="item">
      <input v-model="basicData.consultName" @focus="focus" @blur="blur" type="text" placeholder="请输入标题" />
    </div>
    <div class="half-x-line"/>
    <div class="item box">
      <div class="box box-item">发布版块</div>
      <div class="box box-y-center box-x-right box-col-flex" @click="toggleBottomSelectFn">
        {{ className || '请选择一级版块' }}<i class="iconfont">&#xe600;</i>
      </div>
    </div>
    <!-- <div class="half-x-line"/>
    <div class="item box">
      <div class="box box-item">发布版块</div>
      <div class="box box-y-center box-x-right box-col-flex" @click="toggleBottomSelectFn">
        请选择二级版块<i class="iconfont">&#xe66e;</i>
      </div>
    </div> -->
    <div class="half-x-line"/>
    <div class="textarea-container">
      <textarea v-model="basicData.consultDetail" @focus="focus" @blur="blur" placeholder="请输入内容"/>
    </div>
    <div class="half-x-line"/>
    <div class="info box box-item">
      图片编辑请到PC端进行，登录www.cnjczh.com
    </div>
    <IButton class="ts-btn" :class="{active: testBasicData.length===0}" @clickFn="addPost">
      发布
    </IButton>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IButton from '../components/IButton'
export default {
  components: {
    IButton,
  },
  data() {
    return {
      basicData: {
        consultName: null,
        consultDetail: null,
        classId: null,
      },
      className: null,
      pageHeight: null,
    }
  },
  computed: {
    ...mapState('basic', [
      'basic',
    ]),
    testBasicData() {
      return this.$Helper.testParamsComplete({ params: this.basicData })
    },
  },
  watch: {},
  methods: {
    toggleBottomSelectFn() {
      this.$store.dispatch('ToggleBottomSelect', true)
    },
    addPost() {
      // test params complete
      // get html detail
      const config = {
        consultImg: '图片',
        classId: '分类',
        consultName: '标题',
        video: '视频链接',
        consultDetail: '详情',
      }
      if (this.testBasicData.length > 0) {
        this.$Helper.message.toast({
          text: `请填写${config[this.testBasicData[0]]}信息`,
          long: 2000,
        })
        return
      }
      // begin post
      this.$Helper.ajax({
        url: 'WeConsult.InsertConsult',
        urlType: 'bbs',
        params: { ...this.basicData, authorId: this.basic.id },
        method: 'GET',
      }).then(
        ({ret, msg}) => {
          this.$Helper.message.toast({
            long: 2000,
            text: msg || (ret === 200 ? '创建成功' : '操作失败'),
          })
          // jump to fourm page
          if (ret === 200) setTimeout(() => this.$Helper.jumpPage({ name: 'Forum', params: { reset: true } }, this), 600)
        },
        ({msg}) => {
          this.$$Helper.message.toast({
            text: msg || '操作失败',
            long: 2000,
          })
        },
      )
    },
    focus(e) {
      if (this.$Helper.isAndroid()) {
        let top = e.target.offsetTop > this.pageHeight * 0.4 ? this.pageHeight * 0.4 : e.target.offsetTop
        document.getElementById('postContainer').style.height = this.pageHeight + 'px'
        document.getElementById('postContainer').style.top = -top + 'px'
        setTimeout(() => {
          let blur = () => {
            e.target.blur()
            window.removeEventListener('resize', blur, false)
          }
          window.addEventListener('resize', blur, false)
        }, 1000)
      }
    },
    blur() {
      if (this.$Helper.isAndroid()) {
        document.getElementById('postContainer').style.top = 0
      }
    },
  },
  created() {
    this.$Helper.onAction('choseSelect', (item) => {
      this.className = item.consultClassName
      this.basicData.classId = item.id
    })
    // // check login
    // this.$Helper.emitAction('testLogin')
  },
  mounted() {
    // 存储一下页面高度
    this.pageHeight = document.body.offsetHeight
  },
}
</script>

<style lang="less" scoped>
  @import "../../theme/index.less";
  .container{
    color: #aaa;
    .item{
      height: 12vw;
      padding:0 4vw;
      font-size: 3.8vw;
      input{
        width: 100%;
        height: 100%;
        font-size: 3.8vw;
      }
      &>div{
        &:nth-child(2) {
          font-size: 3.5vw;
          color: @fontColor3;
          .iconfont{
            font-size: 3vw;
            color: @fontColor3;
          }
        }
      }
    }
    .textarea-container{
      padding:4vw;
      textarea{
        width:100%;
        height: 30vh;
        font-size: 3.5vw;
      }
    }
    .info{
      height: 36vw;
      font-size: 3.2vw;
    }
    .ts-btn {
      position: absolute;
      bottom: 10vw;
      left: 0;
      right: 0;
      margin: auto;
      width: 80vw;
      height: 11vw;
      background: #bbbbbb;
      color: white;
      border-radius: 1vw;
      font-size: 4vw;
      border:none;
    }
    .ts-btn.active {
      background: @activeFontColor;
    }
  }
</style>
