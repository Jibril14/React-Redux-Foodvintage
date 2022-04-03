import React from "react";
import classes from "./Grid.module.css";
import LeftColumn from "../LeftColumn/LeftColumn";
import RightColumn from "../RightColumn/RightColumn";
import Category from "../UI/Category/Category";
import Profile from "../UI/Profile/Profile";
import Restaurant from "../../Containers/Restaurant/Restaurant";
import Dinner from "../UI/Dinner/Dinner";
import Lunch from "../UI/Lunch/Lunch";
import Slider from "../UI/ImageSlider/Slider";
import {
    Routes,
    Route,
    useParams,
    useLocation,
    useNavigate
} from "react-router-dom";

const Grid = (props) => {
    console.log("props", props);

    return (
        <div className={classes.pageContent}>
            <div className={classes.grid}>
                <LeftColumn>
                    <Profile />
                    <Category />
                </LeftColumn>
                <RightColumn>
                    <Slider />
                    <Routes>
                        <Route path="/" exact element={<Restaurant />} />
                        <Route path={"lunch"} element={<Lunch />} />
                        <Route
                            path={props.location.pathname + "dinner"}
                            element={<Dinner />}
                        />
                    </Routes>
                </RightColumn>
            </div>
        </div>
    );
};

export default Grid;
