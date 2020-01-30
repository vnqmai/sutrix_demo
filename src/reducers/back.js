const initState = {
    nStep_AddToFilterResult: 0
}

export const backReducer = (state = initState, action) => {
    switch (action.type) {
        case 'INCREASE_STEP_ADD_BACK_TO_FILTER_RESULT':
            {
                return {
                    ...state,
                    nStep_AddToFilterResult: state.nStep_AddToFilterResult + 1
                }
            }

        case 'RESET_STEP_ADD_BACK_TO_FILTER_RESULT':
            {
                return {
                    ...state,
                    nStep_AddToFilterResult: 0
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