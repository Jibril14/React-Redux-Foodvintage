import * as actionTypes from "../actions/actionTypes";

const initialState = {
    foods: null,
    totalPrice: 0,
    error: null
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

        case actionTypes.SET_FOODS:
            return {
                ...state,
                foods: action.foods, //Food object from server
                totalPrice: 0,
                error: null
            };

        case actionTypes.FETCH_FOODS_ERROR:
            return {
                ...state,
                error: action.err //Error message dispatch
            };

        default:
            return state;
    }
};

export default reducer;
