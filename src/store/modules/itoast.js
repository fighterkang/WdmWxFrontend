// import _ from 'lodash'

const namespaced = true

const state = {
  text: null,
  show: false,
}

const mutations = {
  UPDATE(state, data) {
    Object.assign(state, data)
  },
}

const actions = {
  update({ commit }, data) {
    commit('UPDATE', data)
  },
}

export default { namespaced, state, mutations, actions }
