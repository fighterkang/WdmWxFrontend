const namespaced = true

const state = {
  top: null,
  status: false,
}

const mutations = {
  setScroller(state, data) {
    state.status = !state.status
    state.top = data
  },
}

const actions = {
  setScroller({ commit }, data) {
    commit('setScroller', data)
  },
}

export default { namespaced, state, mutations, actions }
