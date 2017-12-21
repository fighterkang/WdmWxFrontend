import store from '../store'
import Vue from 'vue'
import apiConfig from '@/config/api'
import Router from '@/router'
import Cookie from 'js-cookie'
import routeConfig from '@/config/route'
import _ from 'lodash'
import wx from 'weixin-js-sdk'
const THIS = new Vue()
const { dispatch } = store
const Helper = {
  preSetParams(params) {
    let newData = {}
    for (let i in params) {
      if (params[i] !== null && params[i] !== undefined && params[i] !== '') {
        newData[i] = _.trim(params[i])
      }
    }
    return newData
  },
  ajax({ params = {}, method = 'GET', url, success = () => { }, error = () => { } }) {
    if (!url) throw new Error('Ajax error,without url!')
    let openid = Helper.getUrlParamsByKey('openid')
    params = Helper.preSetParams(openid ? Object.assign(params, { openid }) : params)
    url = Helper.getApi() + url
    return THIS.$http({ method, url, params }).then(
      ({ bodyText = '{}' }) => {
        let { msg, data } = JSON.parse(bodyText)
        if (msg) {
          Helper.message.toast({
            text: msg,
            long: 2000,
          })
        }
        success(data)
      },
      () => {
        Helper.message.toast({
          text: '网络繁忙，请稍候再试',
          long: 2000,
        })
        error()
      },
    )
  },
  getCookie(key) {
    return Cookie.get(key)
  },
  setCookie(key, data) {
    Cookie.set(key, data, { expires: 0.04 })
    if (key === 'basic') {
      dispatch('basic/setLoginData', data)
    }
  },
  message: {
    toast({ text, long } = {}) {
      if (this.timerId) clearInterval(this.timerId)
      if (!long) {
        dispatch('itoast/update', { text: null, show: false })
        return
      }
      dispatch('itoast/update', { text, show: true })
      this.timerId = setTimeout(() => {
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
  getUrlParams(key) {
    let href = window.location.href
    let pramsString = href.substring(href.indexOf('?') + 1, href.indexOf('#'))
    let paramsArr = pramsString.split('&')
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
  loadWx(_fun) {
    let basic = Helper.getUrlParams()
    Helper.ajax({
      params: {
        PublicId: _.get(basic, 'PublicId'),
        Url: window.location.href,
      },
      url: 'Wx.MakeJsToken',
      success: ({ data }) => {
        let config = {
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [
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
            'hideMenuItems',
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
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          console.log('success')
          if (_fun) _fun()
        })
      },
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
  isAndroid() {
    let u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  },
}

export default Helper