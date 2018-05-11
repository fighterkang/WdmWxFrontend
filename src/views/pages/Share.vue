<template lang="html">
  <div class="container" id="shareContainer">
    <img :src="bacImage"/>
    <ul>
      <li>
        <div class="box box-item">
          <i class="iconfont">&#xe6ce;</i>
        </div>
        <Iinput v-model="rigster.phone" inputType="text" placeholder="请输入手机号" :fixHeight="true" container="shareContainer"/>
      </li>
      <li>
        <div class="box box-item">
          <i class="iconfont">&#xe633;</i>
        </div>
        <Iinput v-model="rigster.pwd1" inputType="password" placeholder="请输入密码" :fixHeight="true" container="shareContainer"/>
      </li>
      <li>
        <div class="box box-item">
          <i class="iconfont">&#xe63d;</i>
        </div>
        <Iinput v-model="rigster.pwd2" inputType="password" placeholder="请确认密码" :fixHeight="true" container="shareContainer"/>
      </li>
      <li>
        <div class="box box-item">
          <i class="iconfont">&#xe606;</i>
        </div>
        <Iinput v-model="rigster.code" inputType="text" placeholder="请输入验证码" :fixHeight="true" container="shareContainer"/>
        <div class="box box-item btn" @click="getCode">
          {{ isCodeWaiting ? `${ codeLeftSecond }s` : '发送' }}
        </div>
      </li>
    </ul>
    <div class="box box-y-center box-x-right login-btn" @click="goToLogin">已有账号？点我登录</div>
    <div class="btn box box-item" @click="rigsterFn">立即注册</div>
  </div>
</template>
<script>
import Iinput from '../components/Iinput'
import md5 from 'js-md5'
export default {
  components: {
    Iinput,
  },
  data() {
    return {
      urlParams: {
        level: 1,
        pid: 0,
        fid: 0,
      },
      levelImage: ['static/pic_yh.png', 'static/pic_yiji.png', 'static/pic_erji.png'],
      login: {
        username: null,
        password: null,
      },
      rigster: {
        code: null,
        phone: null,
        pwd1: null,
        pwd2: null,
      },
      isCodeWaiting: false,
      codeLeftSecond: 0,
      Timer: null,
      pageHeight: null,
    }
  },
  computed: {
    bacImage() {
      return this.levelImage[this.urlParams.level]
    },
    testLogin() {
      return this.$Helper.testParamsComplete({params: this.login})
    },
    testRigister() {
      return this.$Helper.testParamsComplete({params: this.rigster, except: ['pwd2']})
    },
  },
  watch: {},
  methods: {
    goToLogin() {
      this.$Helper.jumpPage({ name: 'Login' }, this)
    },
    rigsterFn() {
      if (this.testRigister.length > 0) {
        let config = {
          code: '验证码',
          phone: '手机号',
          pwd1: '密码',
        }
        this.$message({
          message: `请输入${config[this.testRigister[0]]}信息`,
          type: 'warning',
        })
        return
      }
      if (this.rigster.pwd1 !== this.rigster.pwd2) {
        this.$message({
          message: `两次输入的密码不一致`,
          type: 'warning',
        })
        return
      }
      if (!this.rigster.phone || this.rigster.phone.toString().length !== 11) {
        this.$message({
          type: 'warning',
          message: '请输入一个正确的手机号',
        })
        return
      }
      let { pid, fid } = this.urlParams
      if (fid === undefined) pid = 0
      this.$Helper.ajax({
        url: 'open/register',
        method: 'POST',
        params: {
          ...this.rigster,
          pwd1: md5(this.rigster.pwd1),
          pwd2: undefined,
          pid: pid || 0,
          fid: fid || 0,
          level: this.urlParams.level,
        },
      }).then(
        () => {
          this.login = {
            username: this.rigster.phone,
            password: this.rigster.pwd1,
            category: 1,
          }
          setTimeout(() => this.$Helper.jumpPage('Download', this), 600)
          // if (this.urlParams.type === 'download') {
          //   setTimeout(() => this.$Helper.jumpPage('Download', this), 600)
          // } else {
          //   this.$Helper.message.toast({ text: '注册成功，正在登录', long: 2000 })
          //   setTimeout(() => {
          //     this.loginFn()
          //   }, 1000)
          // }
        },
        () => {
          this.$message({
            type: 'error',
            message: '注册失败',
          })
        },
      )
    },
    loginFn() {
      if (this.testLogin.length > 0) {
        let config = {
          'username': '用户名',
          'password': '密码',
        }
        this.$message({
          message: `请输入${config[this.testLogin[0]]}信息`,
          type: 'warning',
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
          this.$Helper.jumpPage({ name: 'Forum' }, this)
        }
        this.$message({
          type: 'info',
          message: message || '登录成功',
        })
      })
    },
    getCode() {
      // judge have a right phone number
      if (!this.rigster.phone || this.rigster.phone.toString().length !== 11) {
        this.$message({
          type: 'warning',
          message: '请输入一个正确的手机号',
        })
        return
      }
      this.$Helper.ajax({
        url: 'open/getCode',
        method: 'GET',
        params: { phone: this.rigster.phone },
      }).then(
        () => {
          this.$message({
            type: 'success',
            message: '验证码发送成功，请注意查收',
          })
          this.isCodeWaiting = true
          this.codeLeftSecond = 60
          this.beginTimer()
        },
        () => {
          this.$message({
            type: 'warning',
            message: '验证码获取失败',
          })
        }
      )
    },
    beginTimer() {
      this.Timer = setInterval(() => {
        this.codeLeftSecond --
        if (this.codeLeftSecond < 0) {
          clearInterval(this.Timer)
          this.isCodeWaiting = false
        }
      }, 1000)
    },
    focus(e) {
      if (this.$Helper.isAndroid()) {
        let top = e.target.offsetTop > this.pageHeight * 0.4 ? this.pageHeight * 0.4 : e.target.offsetTop
        document.getElementById('shareContainer').style.height = this.pageHeight + 'px'
        document.getElementById('shareContainer').style.top = -top + 'px'
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
        document.getElementById('shareContainer').style.top = 0
      }
    },
  },
  created() {
    // get params from url
    this.urlParams = Object.assign(this.urlParams, this.$Helper.getUrlParams() || {}, this.$route.params)
    this.$message = ({ message }) => {
      this.$Helper.message.toast({
        text: message,
        long: 2000,
      })
    }
  },
  mounted() {
    // 存储一下页面高度
    this.pageHeight = document.body.offsetHeight
  },
}
</script>

<style lang="less" scoped>
  @import url('../../theme/index.less');
  .container {
    position: relative;
    background: #f7f7f7;
    height: 100%;
    padding-top:70vw;
    &>img{
      position: absolute;
      top:-4vh;
      left:0;
      right:0;
      width: 100%;
    }
    &>ul{
      padding:0 6vw;
      li{
        height: 12vw;
        margin-bottom: 3vw;
        background: white;
        position: relative;
        div{
          position: absolute;
          top:0;
          bottom: 0;
          left:0;
          background: #f1d059;
          width: 15vw;
          &.btn{
            left: auto;
            right: 1vw;
            top: 1.2vw;
            bottom: 1vw;
            border-radius: 10vw;
            height: 10vw;
            background: #f1d059;
            width: 20vw;
            color: white;
            font-weight: 600;
            font-size: 4vw;
          }
          i{
            font-size: 7.5vw;
            color: white;
          }
        }
        input{
          padding-left:18vw;
          font-size: 4vw;
          font-weight: 700;
          height: 100%;
          width: 100%;
          &::-webkit-input-placeholder {
            color: #aaa;
            font-weight: 400;
          }
        }
      }
    }
    &>.login-btn{
      font-weight: 600;
      color: #999;
      font-size: 3vw;
      padding:0 6vw;
    }
    &>.btn{
      height: 12vw;
      width: 46vw;
      color: white;
      font-weight: 600;
      font-size: 4.8vw;
      background: #f1d059;
      margin: 6vw auto;
    }
  }
</style>
