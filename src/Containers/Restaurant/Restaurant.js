import React, { Component } from "react";
import Auxi from "../../Hoc/Auxi";
import Meal from "../../Components/Meal/Meal";
import FoodControl from "../../Components/Meal/FoodControl/FoodControl";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Meal/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "axios";

const FOOD_PRICES = {
    rice: 0.5,
    chicken: 0.4,
    carrot: 0.1
};

class Restaurant extends Component {
    state = {
        foods: {
            rice: 0,
            chicken: 0,
            carrot: 0
        },
        //foods: null,
        totalPrice: 0,
        purchasable: false,
        orderNow: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get("/foods.json").then((response) => {
            this.setState({ foods: response.data });
        });
    }

    updatePurchasable = (foods) => {
        const sum = Object.keys(foods)
            .map((idKey) => {
                return foods[idKey];
            })
            .reduce((tot, val) => {
                return tot + val;
            });

        this.setState({ purchasable: sum > 0 });
    };

    addFoodHandler = (type) => {
        const oldCount = this.state.foods[type];
        const updatedCount = oldCount + 1;
        const updatedFood = {
            ...this.state.foods
        };
        updatedFood[type] = updatedCount;
        const priceAddition = FOOD_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, foods: updatedFood });
        this.updatePurchasable(updatedFood);
    };

    removeFoodHandler = (type) => {
        const oldCount = this.state.foods[type];
        const updatedCount = oldCount - 1;
        const updatedFood = {
            ...this.state.foods
        };
        updatedFood[type] = updatedCount;
        const priceAddition = FOOD_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, foods: updatedFood });
        this.updatePurchasable(updatedFood);
    };

    orderNowHandler = () => {
        this.setState({ orderNow: true });
    };

    orderNowCancelHandler = () => {
        this.setState({ orderNow: false });
        this.setState({ error: null });
    };

    orderNowContinueHandler = () => {
        const queryParams = [];
        for (let x in this.state.foods) {
            queryParams.push(
                encodeURIComponent(x) +
                    "=" +
                    encodeURIComponent(this.state.foods[x])
            );
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    };

    render() {
        const disabledLessBtn = {
            ...this.state.foods
        };

        for (let key in disabledLessBtn) {
            disabledLessBtn[key] = disabledLessBtn[key] <= 0;
        }

        const disabledMoreBtn = {
            ...this.state.foods
        };

        for (let key in disabledMoreBtn) {
            if (key === "rice") {
                disabledMoreBtn["rice"] = disabledMoreBtn["rice"] >= 3;
            } else if (key === "chicken") {
                disabledMoreBtn["chicken"] = disabledMoreBtn["chicken"] >= 5;
            } else {
                disabledMoreBtn["carrot"] = disabledMoreBtn["carrot"] >= 10;
            }
        }

        let foods = <Spinner />;
        let orderSummary = null;

        if (this.state.foods) {
            foods = (
                <Auxi>
                    <Meal
                        foodMenu={this.state.foods}
                        warning={disabledMoreBtn["rice"] === true}
                    />
                    <FoodControl
                        foodAdded={this.addFoodHandler}
                        foodRemoved={this.removeFoodHandler}
                        disableLess={disabledLessBtn}
                        disableMore={disabledMoreBtn}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.orderNowHandler}
                    />
                </Auxi>
            );

            orderSummary = (
                <OrderSummary
                    foodOrder={this.state.foods}
                    orderContinueing={this.orderNowContinueHandler}
                    orderCancelling={this.orderNowCancelHandler}
                    price={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxi>
                <Modal
                    show={this.state.orderNow}
                    modalClose={this.orderNowCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {foods}
            </Auxi>
        );
    }
}

export default Restaurant;
