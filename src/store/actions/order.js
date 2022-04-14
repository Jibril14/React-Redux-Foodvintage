import * as actionTypes from "./actionTypes";
import axios from "axios";

export const purchaseFoodSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_FOOD_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseFoodFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FOOD_FAIL,
        error: error
    };
};

export const purchasingFoodStart = () => {
    return {
        type: actionTypes.PURCHASING_FOOD_START
    };
};

export const purchaseFood = (orderData, homepage) => {
    return (dispatch) => {
        dispatch(purchasingFoodStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                dispatch(purchaseFoodSuccess(response.data.name, orderData));
                setTimeout(() => homepage("/"), 3000);
            })
            .catch((error) => {
                dispatch(purchaseFoodFail("Network Wahala!"));
            });
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

export const fetchOrderInit = () => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        axios
            .get("./orders.json")
            .then((response) => {
                const fetchFoods = [];
                for (let key in response.data) {
                    fetchFoods.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchFoods));
            })
            .catch((err) => {
                dispatch(fetchOrderFail(alert(err)));
            });
    };
};
