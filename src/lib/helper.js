import store from '../store'
import Vue from 'vue'
import apiConfig from '@/config/api'
import Router from '@/router'
import Cookie from 'store'
import routeConfig from '@/config/route'
import { UploaderBuilder } from 'qiniu4js'
import _ from 'lodash'
import wx from 'weixin-js-sdk'
const THIS = new Vue()
const { dispatch } = store
const Helper = {
  isTest() {
    return process.env.NODE_ENV !== 'production'
  },
  preSetParams(params) {
    let newData = {}
    for (let i in params) {
      if (params[i] !== null && params[i] !== undefined && params[i] !== '') {
        newData[i] = _.trim(params[i])
      }
    }
    return newData
  },
  fetch(params) {
    return Helper.ajax(params)
  },
  ajax({ params = {}, method = 'POST', url, urlType = 'api' }) {
    // Helper.clearCookie()
    const ajax = () => {
      if (!url) throw new Error('Ajax error,without url!')
      let basicCookie = Helper.getCookie('basic')
      let accesstoken = _.get(!basicCookie ? {} : JSON.parse(basicCookie), 'token')
      params = method === 'GET' && accesstoken ? Object.assign(params, { accesstoken }) : params
      url = url.indexOf('http') === -1 ? apiConfig[urlType] + url : url
      // alert('url:' + url + ',params' + JSON.stringify(params))
      return new Promise((resolve, reject) => {
        THIS.$http(
          {
            method,
            url,
            params: method === 'GET' ? params : { accesstoken },
            body: method === 'POST' ? JSON.stringify(params) : {},
            // headers: {
            //   'Content-Type': 'application/json',
            // },
          }
        ).then(
          ({ bodyText = '{}' }) => {
            let data = JSON.parse(bodyText)
            if (data.status === 10005) {
              Router.push({ name: 'Login' })
              Helper.message.toast({ text: data.msg || '登录信息有误', long: 2000 })
            } else {
              resolve(data)
            }
          },
          () => {
            Helper.message.toast({ text: '网络繁忙，请稍候再试', long: 2000 })
            reject()
          },
        )
      })
    }
    // get cache
    let isOpen = JSON.parse(Helper.getCookie('isOpen') || '{}').isOpen
    if (!isOpen) {
      return THIS.$http({
        method: 'GET',
        url: 'http://api.wevsport.com/?service=WeOpen.GetCode',
      }).then(
        ({data}) => {
          if (data.data) {
            Helper.setCookie('isOpen', { isOpen: data.data })
            return ajax()
          } else {
            this.$message('网络繁忙，请稍候再试')
          }
        },
        () => {
          this.$message('网络繁忙，请稍候再试')
        }
      )
    } else {
      return ajax()
    }
  },
  getCookie(key) {
    return Cookie.get(key)
  },
  setCookie(key, data) {
    Cookie.set(key, JSON.stringify(data), { expires: 0.0004 })
    if (key === 'basic') {
      dispatch('basic/setLoginData', data)
    }
  },
  clearCookie() {
    Cookie.clearAll()
  },
  htmlToText(str) {
    str = str.replace(/<[^>]+>/g, '')
    str = str.replace(/[\r\n]/g, '')
    str = str.replace(/&nbsp;/g, '')
    return str
  },
  cuteText(str, len = 70) {
    str = str.substr(0, len)
    return str + (str.length >= len ? '...' : '')
  },
  message: {
    toast({ text, long, fn } = {}) {
      if (this.timerId) clearInterval(this.timerId)
      if (!long) {
        dispatch('itoast/update', { text: null, show: false })
        return
      }
      dispatch('itoast/update', { text, show: true })
      this.timerId = setTimeout(() => {
        if (fn) {
          fn()
        }
        dispatch('itoast/update', { text, show: false })
      }, long)
    },
    comfirm({ text, show = false, lFn = () => { console.log('no comfirm Fn!') }, rFn = () => { console.log('no cancel Fn!') } }) {
      if (!text && show) {
        console.error('without comfirm text!')
        return
      }
      dispatch('icomfirm/update', { text, lFn, rFn, show })
    },
    loading({ text = '正在加载...', show, callback } = {}) {
      if (this.loadingSetTimer) clearInterval(this.loadingSetTimer)
      if (show) {
        this.loadingTime = Helper.getTime()
        dispatch('updateLoading', { text, show })
        if (callback) callback()
        this.forgetLoadingTimer = setTimeout(() => {
          dispatch('updateLoading', { text: null, show: false })
        }, 20000)
      } else {
        if (this.forgetLoadingTimer) clearInterval(this.forgetLoadingTimer)
        let timeNow = Helper.getTime()
        let timeBetewwn = timeNow - this.loadingTime
        if (timeBetewwn < 1200) {
          this.loadingSetTimer = setTimeout(() => {
            dispatch('updateLoading', { text, show })
            if (callback) callback()
          }, 1200 - timeBetewwn)
        } else {
          dispatch('updateLoading', { text, show })
          if (callback) callback()
        }
      }
    },
  },
  getApi() {
    // let matchUrl = /(http|ftp|https):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\//.exec(window.location.href)
    // return matchUrl ? matchUrl[0] + 'gzh/?service=' : apiConfig['api']
    return apiConfig['api']
  },
  getUrlHref() {
    const href = window.location.href
    return href.substr(0, href.indexOf('/') === -1 ? href.length - 1 : href.indexOf('/'))
  },
  getUrlParams(key) {
    let href = window.location.href
    // let pramsString = href.substring(href.indexOf('?') + 1, href.indexOf('#'))
    let wIndex = _.lastIndexOf(href.split(''), '?')
    // console.log(wIndex)
    let pramsString = wIndex !== -1 ? href.substr(wIndex + 1) : ''
    let paramsArr = pramsString ? pramsString.split('&') : []
    let returnData = {}
    paramsArr.map((item) => {
      let arr = item.split('=')
      returnData[arr[0]] = arr[1]
    })
    return returnData
  },
  getUrlParamsByKey(key) {
    let params = Helper.getUrlParams()
    return params[key] || null
  },
  testParamsComplete({ params = {}, except = [], contain = [] }) {
    let obj = !_.isEmpty(contain) ? contain : params
    let emptyArr = []
    let isEmpty = (o) => {
      return (Helper.isType(o, {}) && _.isEmpty(o)) || (Helper.isType(o, '') && _.trim(o) === '') || _.isUndefined(o) || Helper.isType(o, null)
    }
    for (let i in obj) {
      let key = _.isEmpty(contain) ? i : obj[i]
      let item = params[key]
      if (isEmpty(item) && except.indexOf(key) === -1) emptyArr.push(key)
    }
    return emptyArr
  },
  isType(obj1, obj2) {
    return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)
  },
  requireAll(requireContext) {
    const ret = {}
    requireContext.keys().forEach(k => {
      const key = k.replace(/.\/|.png|.jpg|.svg/g, '')
      ret[key] = requireContext(k)
    })
    return ret
  },
  getTime() {
    return new Date().getTime()
  },
  emitAction(type, data) {
    THIS.$emit(type, data)
  },
  onAction(type, callback) {
    THIS.$on(type, callback)
  },
  jumpPage(params, that) {
    params = typeof params === 'object' ? params : { name: params }
    if (Helper.getRouteIndex(that.$route.name) === Helper.getRouteIndex(params.name) || Helper.getRouteIndex(params.name) === 0) {
      Router.replace(params)
    } else {
      Router.push(params)
    }
  },
  getRouteIndex(name) {
    let key = null
    for (let i in routeConfig) {
      let item = routeConfig[i]
      if (_.indexOf(item, name) !== -1) {
        key = parseInt(i)
      }
    }
    return key
  },
  loadWx() {
    return new Promise((resolve, reject) => {
      Helper.ajax({
        params: {
          url: window.location.href,
        },
        method: 'GET',
        url: 'open/wxdev/myshare',
      }).then(
        ({data}) => {
          let config = {
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx94f7ad3ab18a5f83', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
              'hideMenuItems',
              'onMenuShareTimeline',    // 分享到朋友圈
              'onMenuShareAppMessage',  // 分享给朋友
              'onMenuShareQQ',        // 分享给QQ
              'onMenuShareWeibo',     // 分享给微博
              'onMenuShareQZone',     // 分享给空间
              'startRecord',      // 开始录音
              'stopRecord',   // 结束录音
              'onVoiceRecordEndplayVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getLocalImgData ',
              'translateVoice',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard',
            ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          }
          wx.config(config)
          wx.ready(() => {
            wx.hideMenuItems({
              menuList: [
                'menuItem:share:facebook',
                'menuItem:share:QZone',
                // 'menuItem:copyUrl',
                'menuItem:delete',
                'menuItem:editTag',
                'menuItem:originPage',
                'menuItem:readMode',
                'menuItem:openWithQQBrowser',
                'menuItem:openWithSafari',
                'menuItem:share:email',
              ],
            })
            resolve()
          })
          wx.error((err) => {
            reject(err)
          })
        },
        (err) => {
          reject(err)
        }
      )
    })
  },
  resetWxShare({title, desc, link, imgUrl = ''}) {
    wx.ready(() => {
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: title.replace(/<[^>]+>/g, ''), // 分享标题
        link, // 分享链接
        imgUrl, // 分享图标
        success: () => {
        },
        cancel: () => {
        },
      })
      // 分享给朋友
      wx.onMenuShareAppMessage({
        title: title.replace(/<[^>]+>/g, ''), // 分享标题
        desc: desc.replace(/<[^>]+>/g, ''), // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        success: () => {
            // 用户确认分享后执行的回调函数
        },
        cancel: () => {
            // 用户取消分享后执行的回调函数
        },
      })
      // 分享给QQ
      wx.onMenuShareQQ({
        title: title.replace(/<[^>]+>/g, ''), // 分享标题
        desc: desc.replace(/<[^>]+>/g, ''), // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        success: () => {
            // 用户确认分享后执行的回调函数
        },
        cancel: () => {
            // 用户取消分享后执行的回调函数
        },
      })
    })
  },
  overScroll(el) {
    el.addEventListener('touchstart', () => {
      let top = el.scrollTop
      let totalScroll = el.scrollHeight
      let currentScroll = top + el.offsetHeight
      if (top === 0) {
        el.scrollTop = 1
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1
      }
    })
    el.addEventListener('touchmove', (evt) => {
      if (el.offsetHeight < el.scrollHeight) evt._isScroller = true
    })
  },
  formatTime(time) {
    let timeBetween = (new Date().getTime() - new Date(time.replace(/-/g, '/')).getTime()) / 1000      // 秒
    let returnData
    if (timeBetween < 15) {
      returnData = '刚刚'
    } else if (timeBetween >= 15 && timeBetween < 60) {
      returnData = parseInt(timeBetween) + '秒前'
    } else if (timeBetween >= 60 && timeBetween < 3600) {
      returnData = parseInt(timeBetween / 60) + '分钟前'
    } else if (timeBetween >= 3600 && timeBetween < 86400) {
      returnData = parseInt(timeBetween / 3600) + '小时前'
    } else if (timeBetween >= 86400 && timeBetween < 2592000) {
      returnData = parseInt(timeBetween / 86400) + '天前'
    } else if (timeBetween >= 2592000 && timeBetween < 31104000) {
      returnData = parseInt(timeBetween / 2592000) + '月前'
    } else if (timeBetween > 31104000) {
      returnData = time
    }
    return returnData
  },
  formatDateTime(inputTime) {
    var date = new Date(inputTime)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var minute = date.getMinutes()
    var second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  isAndroid() {
    let u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  },
  isPc() {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  judgeDevice() {
    if (Helper.isTest()) return
    const isPc = false
    if (isPc !== Helper.isPc()) {
      window.location.href = `${Helper.getUrlHref()}/${isPc ? 'phone' : 'pc'}`
    }
  },
  initUploadImage(btnId, success = () => {}, key) {
    // get upliod token and url
    Helper.ajax({
      url: 'qiniu/getToken',
      method: 'GET',
    }).then(({data}) => {
      this.uptokenData = data
      this.createUpload({
        ...data,
        btnId,
        success,
        key,
      })
    })
  },
  createUpload({ btnId, token, cdnUrl, success = () => { console.log('withOut callback Fn!') }, key = () => {} }) {
    // 创建上传对象
    new UploaderBuilder()
    .debug(true)
    .button(btnId)
    .domain({http: 'http://up-z2.qiniu.com'})
    .retry(0)
    .chunk(true)
    .scale([1000, 0])
    .auto(true)
    .multiple(true)
    // .accept(['image/*', 'video/*', 'mov'])
    .tokenShare(true)
    .tokenFunc((setToken, task) => {
      setToken(token)
    })
    .listener({
      onReady(tasks) {
        // console.log('onReady', tasks)
      },
      onStart(tasks) {
        // console.log('onStart', tasks)
      },
      onTaskGetKey: key,
      onTaskSuccess: (task) => {
        success(cdnUrl + '/' + task.result.key)
      },
      onFinish(tasks) {
        // console.log('onFinish', tasks)
      },
    })
    .build()
  },
}

export default Helper
