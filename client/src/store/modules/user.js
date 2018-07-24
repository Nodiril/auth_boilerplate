const user = {
  state: {
    username: '',
    token: ''
  },

  getters: {
    username (state) {
      return state.username
    },
    token (state) {
      return state.token
    }
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit('SET_USERNAME', userInfo.username)
        commit('SET_TOKEN', userInfo.token)
      })
    },

    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_USERNAME', '')
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
