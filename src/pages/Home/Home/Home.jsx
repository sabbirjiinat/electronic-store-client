import { Helmet } from "react-helmet-async";
import Slider from "../Slider/Slider";
import AllCategory from "../FeatureProduct/AllCategory";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Electronic Store - Home</title>
            </Helmet>
            <Slider/>
            <AllCategory/>
        </div>
    );
};

export default Home;