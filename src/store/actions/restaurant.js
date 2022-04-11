import * as actionTypes from "./actionTypes";
import axios from "axios";
export const addFood = (name) => {
    return {
        type: actionTypes.ADD_FOOD,
        foodName: name
    };
};

export const removeFood = (name) => {
    return {
        type: actionTypes.REMOVE_FOOD,
        foodName: name
    };
};

export const setFoods = (food) => {
    return {
        type: actionTypes.SET_FOODS,
        foods: food
    };
};

export const fetchFoodsError = (err) => {
    return {
        type: actionTypes.FETCH_FOODS_ERROR,
        err: err
    };
};

export const initFoods = () => {
    return (dispatch) => {
        axios
            .get("/foods.json")
            .then((response) => {
                dispatch(setFoods(response.data));
            })
            .catch((error) => {
                console.log("error", error);
                dispatch(fetchFoodsError("Network Error"));
            });
    };
};
