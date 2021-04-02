import * as actions from './AuthAction';

export type InitialStateType = typeof initialState;
const initialState = {
    initialized: false,
    userName: "",
    userId: null as null | number,
    contactList: [] as Array<{ id: number, contactName: string, contactPhone: string, contactImageId: number }>
};

export const AuthReducer = (
    state = initialState,
    action: ActionTypes
): InitialStateType => {
    switch (action.type) {
        case 'GET_AUTH': {
            return {
                ...state,
                userName: action.payload.userName,
                userId: action.payload.userId,
                contactList: action.payload.contactList
            };
        }
        case 'CHECK_AUTH': {
            return {
                ...state,
                initialized: true
            };
        }
        case 'SIGN_OUT':
            return {
                ...state,
                initialized: false,
            };
        case 'CREATE_NEW_CONTACT':
            return {
                ...state,
                contactList: [
                    ...state.contactList,
                    {
                        id: Date.now(),
                        contactName: action.payload.contactName,
                        contactPhone: action.payload.contactPhone,
                        contactImageId: action.payload.contactImageId
                    }
                ]
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contactList: [
                    ...state.contactList.map(todo => {
                        debugger
                        if (todo.id === action.payload.contactId) {
                            todo.contactName = action.payload.contactName;
                            todo.contactPhone = action.payload.contactPhone;
                        }
                        return todo;
                    })
                ]
            };
        default:
            return {
                ...state,
            };
    }
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export default AuthReducer;