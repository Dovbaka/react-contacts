import {combineReducers, createStore, compose} from 'redux';
import AuthReducer, {ActionTypes} from "./Auth/AuthReducer";

const appReducer = combineReducers({
    AuthReducer,
});

const rootReducer = (state: AppStateType | undefined, action: ActionTypes) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'SIGN_OUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

type RootReducerType = typeof appReducer;
export type AppStateType = ReturnType<RootReducerType>;


const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers()
);

export default store;