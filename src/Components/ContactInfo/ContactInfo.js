import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ContactInfo.module.css";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";
import Success from "../UI/Success/Success";
import * as orderActions from "../../store/actions/order";

class ContactInfo extends Component {
    state = {
        customerInfo: {
            name: "",
            email: "",
            address: "",
            postal: "",
            deliveryMethod: ""
        }
    };

    formHandler = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let email = e.target.email;
        let address = e.target.address;
        let postal = e.target.postal;
        let deliveryMethod = e.target.delivery;

        this.setState({
            customerInfo: {
                ...this.state.customerInfo,
                [name]: e.target.value,
                [email]: e.target.value,
                [address]: e.target.value,
                [postal]: e.target.value,
                [deliveryMethod]: e.target.value
            }
        });
    };

    orderHandler = (e) => {
        e.preventDefault();
        const order = {
            foods: this.props.foo,
            price: this.props.totalPrice,
            customerInfo: this.state.customerInfo
        };
        this.props.onOrderFood(order);
    };

    render() {
        let form = (
            <React.Fragment>
            <h4 id="h4">Enter Your Contact Data</h4>
            <form onChange={this.formHandler}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={classes.input}
                    required
                ></input>
                <input
                    className={classes.input}
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                ></input>
                <input
                    className={classes.input}
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                ></input>
                <input
                    className={classes.input}
                    type="text"
                    name="postal"
                    placeholder="Postal Code"
                    maxlength="6"
                    required
                ></input>

                <select
                    id="delivery"
                    name="Delivery method"
                    placeholder="Delivery method"
                    style={{ width: "100%" }}
                >
                    <option value="express">Express Delivery</option>
                    <option value="dhy">Dhl</option>
                </select>
                <Button type="submit" clicked={this.orderHandler}>Order Now</Button>
            </form>
             </React.Fragment>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactInfo}>
                
                {form}
                <Success showErr={this.props.success} />
                <Error showErr={this.props.error} error={this.props.error} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        foo: state.restaurantFood.foods,
        totalPrice: state.restaurantFood.totalPrice,
        loading: state.restaurantOrder.loading,
        error: state.restaurantOrder.error,
        success: state.restaurantOrder.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderFood: (orderData) =>
            dispatch(orderActions.purchaseFood(orderData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
