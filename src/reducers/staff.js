const initState = {
    staffInfo: {}
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

        default:
            {
                return {
                    ...state
                }
            }
    }
}