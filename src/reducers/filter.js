import axios from "axios"

const initState = {
    staff: []
};

export const filterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'APPLY_FILTER':
            {
                return {
                    ...state,
                    staff: action.data
                }
            }
        default:
            {
                return state;
            }
    }
}