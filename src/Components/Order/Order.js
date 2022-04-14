import React, { Component } from "react";
import SingleOrder from "./SingleOrder/SingleOrder";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/order";
import Spinner from "../UI/Spinner/Spinner";

class Order extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => (
                <SingleOrder
                    key={order.id}
                    foods={order.foods}
                    price={+order.price}
                />
            ));
        }
        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.restaurantOrder.orders,
        loading: state.restaurantOrder.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: () => dispatch(orderActions.fetchOrderInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
