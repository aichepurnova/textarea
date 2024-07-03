import { configureStore } from '@reduxjs/toolkit'
import textReducer from './reducer'

const store = configureStore({
  reducer: { text: textReducer},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store