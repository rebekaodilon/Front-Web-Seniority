import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.module'
import auth from './auth.module'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  addToaster(state, data) {
      switch (data.type) {
          case "Exception":
              this._vm.$noty.error(data.text)
              break;
          case "Error":
              this._vm.$noty.error(data.text)
              break;
          case "Success":
              this._vm.$noty.success(data.text)
              break;
          case "Info":
              this._vm.$noty.info(data.text)
              break;
          case "Warning":
              this._vm.$noty.warning(data.text)
              break;
          default:
              this._vm.$noty.info(data.text)
      }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    data,
    auth
  }
})