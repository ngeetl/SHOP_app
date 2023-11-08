import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PAUSE, PERSIST, FLUSH, REHYDRATE } from 'redux-persist'

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage //로컬스토리지
}

 const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware : getDefaultMiddleware => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST]
      }
    }
  )
})

export const persistor = persistStore(store)

