const namespaced = true

const state = {
  basic: {},
}

const mutations = {
  SETLOGINDATA(state, data) {
    Object.assign(state.basic, data)
  },
}

const actions = {
  setLoginData({ commit }, data) {
    commit('SETLOGINDATA', data)
  },
}

export default { namespaced, state, mutations, actions }
