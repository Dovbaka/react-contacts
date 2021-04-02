import store from "../store";

type UserDataType = {
    userId: number,
    userName: string,
    contactList: []
}

export const getAuth = (userName: string) => {
    const localStorageData = localStorage.getItem(userName);
    let userData: UserDataType;
    if (localStorageData) {
        userData = JSON.parse(localStorageData)
    } else {
        userData = {userId: Date.now(), userName: userName, contactList: []}
        localStorage.setItem(userName, JSON.stringify(userData));
    }
    localStorage.setItem("AuthUserName", userName);
    return {
        type: 'GET_AUTH' as const,
        payload: userData,
    };
}

export const checkAuth = () => {
    return {
        type: 'CHECK_AUTH' as const,
    };
}

export const signOut = () => {
    localStorage.removeItem("AuthUserName");
    return {
        type: 'SIGN_OUT' as const
    }
};

export const createNewContact = (contactName: string, contactPhone: string) => {
    const storeData = store.getState().AuthReducer;
    const contactImageId = Math.floor(Math.random() * 350) + 1;

    localStorage.setItem(storeData.userName, JSON.stringify(
        {
            ...storeData, contactList: [
                ...storeData.contactList,
                {
                    id: Date.now(),
                    contactName: contactName,
                    contactPhone: contactPhone,
                    contactImageId: contactImageId
                }
            ]
        }
    ));
    return {
        type: 'CREATE_NEW_CONTACT' as const,
        payload: {contactName, contactPhone, contactImageId}
    };
}

export const updateContact = (contactId: number,contactName: string, contactPhone: string) => {
    const storeData = store.getState().AuthReducer;

    localStorage.setItem(storeData.userName, JSON.stringify(
        {
            ...storeData, contactList: [
                ...storeData.contactList.map(todo => {
                    if (todo.id === contactId) {
                        todo.contactName = contactName;
                        todo.contactPhone = contactPhone;
                    }
                    return todo;
                })
            ]
        }
    ));
    return {
        type: 'UPDATE_CONTACT' as const,
        payload: {contactId, contactName, contactPhone}
    };
}