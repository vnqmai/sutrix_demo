const initState = {
    token: null,
    userId: null,
    username: null,
    expires: null
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            {
                return {
                    ...state,
                    token: action.token,
                    userId: action.userId,
                    username: action.username,
                    expires: action.expires
                }
            }
        case 'LOGOUT':
            {
                return {
                    ...state,
                    token: null,
                    userId: null,
                    username: null,
                    expires: null
                }
            }
        default:
            {
                return {...state };
            }
    }
}