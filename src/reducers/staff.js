const initState = {
    staffInfo: {},
    addSuccess: false,
    updateSuccess: false
};

export const staffReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_STAFF_INFO':
            {
                return {
                    ...state,
                    staffInfo: action.staffInfo
                }
            }

        case 'ADD_NEW_STAFF':
            {
                return {
                    ...state,
                    addSuccess: true
                }
            }

        case 'UPDATE_STAFF':
            {
                return {
                    ...state,
                    updateSuccess: true
                }
            }

        default:
            {
                return {
                    ...state
                }
            }
    }
}