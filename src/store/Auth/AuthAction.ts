import store from "../store";

type UserDataType = {
    userId: number,
    userName: string,
    contactList: []
}

export const getAuth = (userName: string) => {
    const localStorageData = localStorage.getItem(userName);
    let userData: UserDataType;
    if (localStorageData) { //If record exist, simply parse it
        userData = JSON.parse(localStorageData)
    } else { //If no such record exist, create a new user with key as userName
        userData = {userId: Date.now(), userName: userName, contactList: []}
        localStorage.setItem(userName, JSON.stringify(userData));
    }
    localStorage.setItem("AuthUserName", userName); //Set last authenticated userName
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
    localStorage.removeItem("AuthUserName"); //Clear last authenticated userName
    return {
        type: 'SIGN_OUT' as const
    }
};

export const createNewContact = (contactName: string, contactPhone: string) => {
    const storeData = store.getState().AuthReducer;
    const id = Date.now(); //Get unique userID
    const contactImageId = Math.floor(Math.random() * 350) + 1; //Get random number for imageId

    localStorage.setItem(storeData.userName, JSON.stringify(
        {
            ...storeData, contactList: [
                ...storeData.contactList,
                {
                    id: id,
                    contactName: contactName,
                    contactPhone: contactPhone,
                    contactImageId: contactImageId
                }
            ]
        }
    ));
    return {
        type: 'CREATE_NEW_CONTACT' as const,
        payload: {id, contactName, contactPhone, contactImageId}
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