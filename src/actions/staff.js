export const getStaffInfo = (staffInfo, staffHistories) => {
    return {
        type: 'GET_STAFF_INFO',
        staffInfo,
        staffHistories
    }
}

export const addNewStaff = (addSuccess) => {
    return {
        type: 'ADD_NEW_STAFF',
        addSuccess
    }
}

export const updateStaff = (updateSuccess) => {
    return {
        type: 'UPDATE_STAFF',
        updateSuccess
    }
}