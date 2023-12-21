import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todoReducer from './todoSlice';

const rootReducer = combineReducers({
    todos: todoReducer,

});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todos'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default persistedReducer;