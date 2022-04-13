import error from "../../Components/UI/Error/Error";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASING_FOOD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PURCHASE_FOOD_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                order: state.orders.concat(newOrder),
                success: true,
                error: null
            };

        case actionTypes.PURCHASE_SUCCESS_MESSAGE:
            return {
                ...state,
                success: action.success
            };

        case actionTypes.PURCHASE_FOOD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default reducer;
