export const login = (userId, username, token, expires) => {
    return {
        type: 'LOGIN',
        userId,
        username,
        token,
        expires
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}