import React, {useEffect} from 'react';
import './App.css';
import OverridesCss from './material/themeProvider';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import LoginContainer from "./components/Login/LoginContainer";
import {connect, ConnectedProps, Provider} from "react-redux";
import store, {AppStateType} from "./store/store";
import {Dispatch} from "redux";
import {checkAuth, getAuth} from "./store/Auth/AuthAction";
import ContactListContainer from "./components/ContactList/ContactListContainer";

function App(props:AppProps) {
    useEffect(() => {
        // Start initialization
        const authUserName = localStorage.getItem("AuthUserName");
        if (authUserName) {
            props.getAuth(authUserName);
        }
        props.checkAuth();
    }, [props]);

    if (!props.initialized) {
        //Show empty page while initialization isn't completed
        return <div/>;
    }

    return (
        <Switch>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/" component={ContactListContainer}/>
        </Switch>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.AuthReducer.initialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        checkAuth: () => dispatch(checkAuth()),
        getAuth: (username: string) => dispatch(getAuth(username)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type AppProps = ConnectedProps<typeof connector>;
const AppContainer = connector(App);

const AppWithRouter: React.FunctionComponent = () => {
    // Store render before App initialization
    return (
        <BrowserRouter>
            <OverridesCss>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </OverridesCss>
        </BrowserRouter>
    );
};

export default AppWithRouter;
