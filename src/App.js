import React from "react";
import Layout from "./Components/Layout/Layout";
import Checkout from "./Components/Checkout/Checkout";
import Order from "./Components/Order/Order";
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import Grid from "./Components/Grid/Grid";
import Joinus from "./Components/JoinUs/Joinus";

const App = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
        <Layout>
            <Routes>
                <Route path="/order" element={<Order />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/join-us" element={<Joinus />} />
                <Route
                    exact
                    path="*"
                    element={
                        <Grid
                            location={location}
                            navigate={navigate}
                            params={params}
                            {...props}
                        />
                    }
                />
            </Routes>
        </Layout>
    );
};

export default App;
