import React from "react";
import classes from "./NavList.module.css";
import { NavLink } from "react-router-dom";

const navList = (props) => (
    <li className={classes.navList}>
        <NavLink className={classes.active} to={props.link} exact="true">
            {props.children}
        </NavLink>
    </li>
);

export default navList;
