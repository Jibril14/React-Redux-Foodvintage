import * as actionTypes from "../actions/actionTypes";

const initialState = {
    foods: {
        rice: 0,
        chicken: 0,
        carrot: 0
    },
    totalPrice: 0
};

const FOOD_PRICES = {
    rice: 0.5,
    chicken: 0.4,
    carrot: 0.1
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FOOD:
            return {
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] + 1
                },
                totalPrice: state.totalPrice + FOOD_PRICES[action.foodName]
            };

        case actionTypes.REMOVE_FOOD:
            return {
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] - 1
                },
                totalPrice: state.totalPrice - FOOD_PRICES[action.foodName]
            };
        default:
            return state;
    }
};

export default reducer;
