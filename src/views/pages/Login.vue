<template lang="html">
  <div class="container" ref="loginContainer" id="login_con">
    <ul class="login">
      <li>
        <Iinput :classList="{ 'Iinput': true }" v-model="login.username" inputType="text" placeholder="手机号或邮箱" :fixHeight="true" container="login_con"/>
        <i class="iconfont">&#xe629;</i>
      </li>
      <li>
        <Iinput :classList="{ 'Iinput': true, 'password': true}" v-model="login.password" inputType="password" placeholder="密码" :fixHeight="true" container="login_con"/>
        <i class="iconfont">&#xe633;</i>
      </li>
    </ul>
    <IButton class="ts-btn" :class="{active: testLogin.length===0}" @clickFn="loginFn">
      登录
    </IButton>
    <div class="rig box box-item" @click="goToRegister">没有账号？点我注册</div>
  </div>
</template>
<script>
import IButton from '../components/IButton'
import Iinput from '../components/Iinput'
import { mapState } from 'vuex'
import md5 from 'js-md5'
export default {
  components: {
    IButton,
    Iinput,
  },
  data() {
    return {
      pageHeight: null,
      login: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapState('basic', [
      'basic',
    ]),
    testLogin() {
      return this.$Helper.testParamsComplete({ params: this.login })
    },
  },
  watch: {},
  methods: {
    loginFn() {
      if (this.testLogin.length > 0) {
        let config = {
          'username': '用户名',
          'password': '密码',
        }
        this.$Helper.message.toast({
          text: `请输入${config[this.testLogin[0]]}信息`,
          long: 2000,
        })
        return
      }
      this.$Helper.ajax({
        url: 'open/login',
        method: 'POST',
        params: { ...this.login, category: 1, password: md5(this.login.password) },
      }).then(({data, message}) => {
        if (data) {
          // save to cache
          this.$Helper.setCookie('basic', data)
          // jump to forum page
          setTimeout(() => this.$Helper.jumpPage({ name: 'Download' }, this), 600)
        }
        this.$Helper.message.toast({
          text: message,
          long: 2000,
        })
      })
    },
    goToRegister() {
      this.$Helper.jumpPage({ name: 'Share' }, this)
    },
  },
  created() {
    // clear all cache
    this.$Helper.clearCookie()
    // reset basic store
    this.$store.dispatch('basic/setLoginData', {})
    // test if login
    if (this.basic.id) {
      this.$Helper.jumpPage({name: 'Forum'}, this)
    }
  },
  mounted() {
    // 存储一下页面高度
    this.pageHeight = document.body.offsetHeight
  },
}
</script>

<style lang="less" scoped>
  @import '../../theme/index.less';
  .container {
    padding: 25vw 5vw;
    ul{
      li{
        height: 50px;
        border:1px solid #e9e9e9;
        border-top-color:transparent;
        background: #fafafa;
        position: relative;
        &:first-child{
          border-radius: 4px 4px 0 0;
          border-top-color:#e9e9e9;
        }
        &:last-child{
          border-radius: 0 0 4px 4px;
        }
        &>input{
          height: 100%;
          width: 100%;
          border-color: transparent;
          padding-left: 40px;
          font-weight: 600;
          color: #666;
          font-size: 16px;
          &::-webkit-input-placeholder {
            color: #888;
            font-size: 14px;
            font-weight: 400;
          }
          &.password{
            // font-size: 10px;
            font-weight: 400;
          }
        }
        &>i{
          position: absolute;
          top: 12px;
          left:10px;
          color: #969696;
          font-size: 20px;
        }
        &>.el-button{
          position: absolute;
          right: 10px;
          top: 10px;
          margin: auto;
        }
      }
    }
    .ts-btn {
      position: absolute;
      bottom: 16vw;
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
    .rig{
      position: absolute;
      bottom: 9vw;
      left: 0;
      right: 0;
      font-weight: 600;
      color: #999;
      font-size: 3vw;
    }
  }
</style>
