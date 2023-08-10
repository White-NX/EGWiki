import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    userStatus:{

      isLogin: false,
      username: '',
      session: ''

    }

  },
  mutations: {
    setLoginState(state, inf) {

      if (typeof inf.isLogin != 'boolean') throw new SyntaxError('isLogin must be a boolean, recieved' + typeof inf.isLogin)

      state.userStatus.isLogin = inf.isLogin
      state.userStatus.username = typeof inf.isLogin != false ? inf.username : ''
      state.userStatus.session = typeof inf.isLogin != false ? inf.session : ''


    }
  }
})