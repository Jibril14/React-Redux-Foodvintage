import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Checkout.module.css";
import Meal from "../Meal/Meal";
import Button from "../UI/Button/Button";
import ContactInfo from "../ContactInfo/ContactInfo";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.navigate("/");
    };

    checkoutContinuedHandler = () => {
        this.props.navigate("/checkout/contact-data");
        console.log(this.props.location.pathname + "/contact-data");
    };
    render() {
        return (
            <div className={classes.Contact}>
                <div>
                    <h1>Do have a wonderful meal!</h1>
                    <div
                        style={{
                            width: "300px",
                            margin: "auto",
                            position: "relative"
                        }}
                    >
                        <Meal foodMenu={this.props.foo} />
                        <div>
                            <Button
                                btnType="Danger"
                                clicked={this.checkoutCancelledHandler}
                            >
                                CANCEL
                            </Button>
                            <Button
                                btnType="Success"
                                clicked={this.checkoutContinuedHandler}
                            >
                                CONTINUE
                            </Button>
                        </div>
                    </div>
                    <Routes>
                        <Route path="contact-data" element={<ContactInfo />} />
                        {/* Route auto match the base component url*/}
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        foo: state.foodReducer.foods
    };
};
export default connect(mapStateToProps)(Checkout);
