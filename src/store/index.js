// import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router'
import basic from './modules/basic'
import itoast from './modules/itoast'
import icomfirm from './modules/icomfirm'
import scroller from './modules/scroller'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    debug: true,
    showBar: true,
    showBottomSelect: false,
    rewardData: {
      show: false,
      titleid: null,
    },
    entryData: {
      show: false,
      titleid: null,
    },
    exchangeListData: {},
    gameListData: {},
    promptData: {
      show: false,
      titleid: null,
    },
    imagepreview: {
      show: false,
      image: null,
    },
    loadingData: {
      show: false,
      text: '正在加载...',
    },
    iwaitData: {
      show: false,
      top: 0,
    },
    locationCity: null,
    iMenuData: {
      show: false,
    },
    examHeadInfoTitle: '考试中心',
    examHeadInfoVipTime: 0,
    questionModelData: {
      show: false,
    },
    questionModel2Data: {
      show: false,
    },
  },
  actions: {
    ToggleBar({ commit, dispatch }, data) {
      commit('TOGGLEBAR', data)
    },
    ToggleBottomSelect({ commit, dispatch }, data) {
      commit('TOGGLEBOTTOMSELECT', data)
    },
    ToggleReward({ commit, dispatch }, data) {
      commit('TOGGLEREWARD', data)
    },
    ToggleEntry({ commit, dispatch }, data) {
      commit('TOGGLEENTRY', data)
    },
    setExchangeListData({ commit, dispatch }, data) {
      commit('SETEXCHANGELISTDATA', data)
    },
    setGameListData({ commit, dispatch }, data) {
      commit('SETGAMELISTDATA', data)
    },
    addLikeCount({ commit, dispatch }, data) {
      commit('ADDLIKECOUNT', data)
    },
    addCommentCount({ commit, dispatch }, data) {
      commit('ADDCOMMENTCOUNT', data)
    },
    TogglePrpmptData({ commit, dispatch }, data) {
      commit('TOGGLEPROMPTDATA', data)
    },
    deleteTitle({ commit, dispatch }, data) {
      commit('DELETETITLE', data)
    },
    cancelTop({ commit, dispatch }, data) {
      commit('CANCELTOP', data)
    },
    PreviewImage({ commit, dispatch }, data) {
      commit('PREVIEWIMAGE', data)
    },
    updateLoading({ commit, dispatch }, data) {
      commit('UPDATELOADING', data)
    },
    setLocationCity({ commit, dispatch }, data) {
      commit('SETLOCATIONCITY', data)
    },
    ToggleIwaitData({ commit, dispatch }, data) {
      commit('TOGGLEIWAITDATA', data)
    },
    ToggleIMenuData({ commit, dispatch }, data) {
      commit('TOGGLEIMENUDATA', data)
    },
    ChangeExamInfoTitle({ commit, dispatch }, data) {
      commit('CHNAGEEXAMHEADTITLE', data)
    },
    ChangeExamInfoVipTime({ commit, dispatch }, data) {
      commit('CHNAGEEXAMHEADVIPTIME', data)
    },
    toggleQuestionModel({ commit, dispatch }, data) {
      commit('TOGGLEQUESTIONMODEL', data)
    },
    toggleQuestionModel2({ commit, dispatch }, data) {
      commit('TOGGLEQUESTIONMODEL2', data)
    },
  },
  mutations: {
    TOGGLEBAR(state, data) {
      state.showBar = data
    },
    TOGGLEBOTTOMSELECT(state, data) {
      state.showBottomSelect = data
    },
    TOGGLEREWARD(state, data) {
      Object.assign(state.rewardData, data)
    },
    TOGGLEENTRY(state, data) {
      Object.assign(state.entryData, data)
    },
    SETEXCHANGELISTDATA(state, data) {
      Object.assign(state.exchangeListData, data)
    },
    SETGAMELISTDATA(state, data) {
      Object.assign(state.gameListData, data)
    },
    ADDCOMMENTCOUNT(state, {titleid, type}) {
      let savedList = type === 'ExchangeList' ? state.exchangeListData.list : state.gameListData.list
      for (let i in savedList) {
        let item = Object.assign({}, savedList[i])
        if (item.id === titleid) {
          item.comment = parseInt(item.comment) + 1
          savedList.splice(i, 1, item)
          break
        }
      }
    },
    TOGGLEPROMPTDATA(state, data) {
      Object.assign(state.promptData, data)
    },
    DELETETITLE(state, {titleid, type}) {
      let savedList = type === 'ExchangeList' ? state.exchangeListData.list : state.gameListData.list
      for (let i in savedList) {
        let item = savedList[i]
        if (item.id === titleid) {
          savedList.splice(i, 1)
          break
        }
      }
    },
    CANCELTOP(state, data) {
      let savedList = state.exchangeListData.list
      for (let i in savedList) {
        let item = savedList[i]
        if (item.id === data.titleid) {
          item.top = '0'
          break
        }
      }
    },
    PREVIEWIMAGE(state, data) {
      Object.assign(state.imagepreview, data)
    },
    UPDATELOADING(state, data) {
      Object.assign(state.loadingData, data)
    },
    SETLOCATIONCITY(state, data) {
      state.locationCity = data
    },
    ADDLIKECOUNT(state, {titleid, type}) {
      let savedList = type === 'ExchangeList' ? state.exchangeListData.list : state.gameListData.list
      for (let i in savedList) {
        let item = Object.assign({}, savedList[i])
        if (item.id === titleid) {
          item.like = parseInt(item.like) + 1
          item.isLike = 1
          savedList.splice(i, 1, item)
          break
        }
      }
    },
    TOGGLEIWAITDATA(state, data) {
      Object.assign(state.iwaitData, data)
    },
    TOGGLEIMENUDATA(state, data) {
      Object.assign(state.iMenuData, data)
    },
    CHNAGEEXAMHEADTITLE(state, data) {
      state.examHeadInfoTitle = data
    },
    CHNAGEEXAMHEADVIPTIME(state, data) {
      Object.assign(state.examHeadInfoVipTime, data)
    },
    TOGGLEQUESTIONMODEL(state, data) {
      Object.assign(state.questionModelData, data)
    },
    TOGGLEQUESTIONMODEL2(state, data) {
      Object.assign(state.questionModel2Data, data)
    },
  },
  modules: {
    itoast,
    icomfirm,
    basic,
    scroller,
  },
  strict: debug,
})

if (module.hot) {
  module.hot.accept(
    [
      './modules/itoast',
      './modules/icomfirm',
      './modules/basic',
      './modules/scroller',
    ],
    () => store.hotUpdate({
      modules: {
        itoast: require('./modules/itoast').default,
        icomfirm: require('./modules/icomfirm').default,
        ibasic: require('./modules/basic').default,
        scroller: require('./modules/scroller').default,
      },
    }))
}

export default store
