import React, { Component } from "react";
import { connect } from "react-redux";
import Auxi from "../../Hoc/Auxi";
import Meal from "../../Components/Meal/Meal";
import FoodControl from "../../Components/Meal/FoodControl/FoodControl";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Meal/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "axios";
import * as actionTypes from "../../store/actions";

class Restaurant extends Component {
    state = {
        purchasable: false,
        orderNow: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get("/foods.json").then((response) => {
            this.setState({ foods: response.data });
        });
        console.log("this.props.foo", this.props.foo);
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
        queryParams.push("price=" + this.props.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    };

    render() {
        const disabledLessBtn = {
            ...this.props.foo
        };

        for (let key in disabledLessBtn) {
            disabledLessBtn[key] = disabledLessBtn[key] <= 0;
        }

        const disabledMoreBtn = {
            ...this.props.foo
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

        if (this.props.foo) {
            foods = (
                <Auxi>
                    <Meal
                        foodMenu={this.props.foo}
                        warning={disabledMoreBtn["rice"] === true}
                    />
                    <FoodControl
                        foodAdded={this.props.onAddFood}
                        foodRemoved={this.props.onRemoveFood}
                        disableLess={disabledLessBtn}
                        disableMore={disabledMoreBtn}
                        price={this.props.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.orderNowHandler}
                    />
                </Auxi>
            );

            orderSummary = (
                <OrderSummary
                    foodOrder={this.props.foo}
                    orderContinueing={this.orderNowContinueHandler}
                    orderCancelling={this.orderNowCancelHandler}
                    price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
    return {
        foo: state.foodReducer.foods,
        totalPrice: state.foodReducer.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddFood: (fName) =>
            dispatch({ type: actionTypes.ADD_FOOD, foodName: fName }),

        onRemoveFood: (fName) =>
            dispatch({ type: actionTypes.REMOVE_FOOD, foodName: fName })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
