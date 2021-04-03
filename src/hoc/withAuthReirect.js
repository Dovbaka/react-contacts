import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        userName: state.AuthReducer.userName,
    };
};

export const withAuthRedirect = (Component) => {
    //HOC for redirecting to login screen if user authorized
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.userName) return <Redirect to={'/'}/>;
            return <Component {...this.props} />;
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};