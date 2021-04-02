import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../../store/store";
import {createNewContact, getAuth, signOut, updateContact} from "../../store/Auth/AuthAction";
import ContactList from "./ContactList";
import {withNotAuthRedirect} from "../../hoc/withNotAuthRedirect";

const mapStateToProps = (state: AppStateType) => {
    return {
        userName: state.AuthReducer.userName,
        contactList: state.AuthReducer.contactList
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAuth: (username: string) => dispatch(getAuth(username)),
        createNewContact: (contactName: string, contactPhone: string) =>
            dispatch(createNewContact(contactName, contactPhone)),
        updateContact: (contactId: number, contactName: string, contactPhone: string) =>
            dispatch(updateContact(contactId, contactName, contactPhone)),
        signOut: () => dispatch(signOut())
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>

export default withNotAuthRedirect(connector(ContactList));