import { createStore } from 'vuex'

import moduleProvider from './modules/moduleProvider'

export default createStore({
  modules: {
    moduleProvider
  }
})
