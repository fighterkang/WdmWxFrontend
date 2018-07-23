import Vue from 'vue'
import Router from 'vue-router'
import Helper from '@/lib/helper'

Vue.use(Router)
// let pageTitleConfig = {
//   'Forum': '论坛',
//   'Search': '搜索',
//   'Published': '已发布的帖子',
//   'Post': '发布',
//   'Collect': '收藏',
//   'Home': '家园共建',
//   'Detail': '帖子',
//   'PostDetail': '帖子详情',
//   'Login': '登录',
//   'Share': '注册',
//   KKK
//   'ShareMIniVideo': '分享小视频',
//   'ExamCenter': '考试中心(一级)',
//   'ExamClassTwo': '考试中心(二级)',
//   'ExamClassThree': '考试中心(三级)',
//   'choiseQuestion': '选择题',
//   'analyticalQuestions': '简答题',
// }
let route = []
const RouterFile = Helper.requireAll(require.context(`../views/pages`, true, /\.vue$/))
for (var i in RouterFile) {
  let name = i.substr(0, i.indexOf('.'))
  route.push({
    path: '/' + name.toLowerCase(),
    name,
    component: RouterFile[i],
    meta: {
      title: '显百中心',
    },
  })
}
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/forum',
    },
  ].concat(route),
})
