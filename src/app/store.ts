import { configureStore } from '@reduxjs/toolkit'

import rootReducer from 'app/rootReducer'

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/rootReducer', () => {
    const newRootReducer = require('app/rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store
