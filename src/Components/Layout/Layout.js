import React, { Component } from "react";
import Auxi from "../../Hoc/Auxi";
import classes from "./Layout.module.css";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Toolbar/Footer/Footer";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import Banner from "../UI/Banner/Banner";
import { Routes, Route } from "react-router-dom";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    componentDidMount() {
        console.log("props2", this.props);
    }
    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggle = () => {
        this.setState((p) => {
            return { showSideDrawer: !p.SideDrawer };
        });
    };

    render() {
        return (
            <Auxi>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.SideDrawerClosedHandler}
                />
                <Toolbar drawToggle={this.sideDrawerToggle} />
                <main className={classes.main}>{this.props.children}</main>
                <Routes>
                    <Route path="/" exact element={<Banner />}></Route>
                </Routes>
                <Footer />
            </Auxi>
        );
    }
}

export default Layout;
