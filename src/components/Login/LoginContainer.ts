import {Dispatch} from "redux";
import Login from "./Login";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../../store/store";
import {getAuth} from "../../store/Auth/AuthAction";
import {withAuthRedirect} from "../../hoc/withAuthReirect";

const mapStateToProps = (state: AppStateType) => {
    return {
        userName: state.AuthReducer.userName,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAuth: (username: string) => dispatch(getAuth(username)),
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>

export default withAuthRedirect(connector(Login));