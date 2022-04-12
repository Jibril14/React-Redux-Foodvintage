import React, { Component } from "react";
import { connect } from "react-redux";
import Auxi from "../../Hoc/Auxi";
import Meal from "../../Components/Meal/Meal";
import FoodControl from "../../Components/Meal/FoodControl/FoodControl";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Meal/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as restaurantActions from "../../store/actions/restaurant";
import Error from "../../Components/UI/Error/Error";

class Restaurant extends Component {
    state = {
        orderNow: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitFood();
    }

    updatePurchasable = (foods) => {
        const sum = Object.keys(foods)
            .map((idKey) => {
                return foods[idKey];
            })
            .reduce((tot, val) => {
                return tot + val;
            });

        return sum > 0;
    };

    orderNowHandler = () => {
        this.setState({ orderNow: true });
    };

    orderNowCancelHandler = () => {
        this.setState({ orderNow: false });
    };

    orderNowContinueHandler = () => {
        this.props.navigate("/checkout");
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

        let error = this.props.error ? (
            <Error showErr={true} error={this.props.error} />
        ) : null;
        let foods = [<Spinner />, error].map((spinnerError) => {
            return <div key={Math.random()}>{spinnerError}</div>;
        });

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
                        purchasable={this.updatePurchasable(this.props.foo)}
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
        foo: state.restaurantFood.foods,
        totalPrice: state.restaurantFood.totalPrice,
        error: state.restaurantFood.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddFood: (fName) => dispatch(restaurantActions.addFood(fName)),
        onRemoveFood: (fName) => dispatch(restaurantActions.removeFood(fName)),
        onInitFood: () => dispatch(restaurantActions.initFoods())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
