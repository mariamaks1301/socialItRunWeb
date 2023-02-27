import {configureStore, combineReducers} from "@reduxjs/toolkit";
import products from "./reducers/products";
import user from "./reducers/user";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import findUsers from "./reducers/findUsers";
import notification from "./reducers/notification";

const rootReducer = combineReducers({
    products: products,
    user,
    findUsers,
    notification

})

const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },

        })
})

export const persistor = persistStore(store)

export default store