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

export const purchaseFood = (orderData) => {
    return (dispatch) => {
        dispatch(purchasingFoodStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                console.log(response);
                dispatch(purchaseFoodSuccess(response.data.name, orderData));
                /*
            this.setState({ loading: false });
            this.setState({ error: null });
            this.setState({ success: true });

            setTimeout(() => this.props.history.push("/"), 3000);
        */
            })
            .catch((error) => {
                dispatch(purchaseFoodFail("Network Wahala!"));

                //this.setState({ loading: false });
            });
    };
};
