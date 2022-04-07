import * as actionTypes from "./actions";

const initialState = {
    foods: {
        rice: 0,
        chicken: 0,
        carrot: 0
    },
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FOOD:
            return {
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] + 1
                }
            };

        case actionTypes.REMOVE_FOOD:
            return {
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] - 1
                }
            };
        default:
            return state;
    }
};

export default reducer;
