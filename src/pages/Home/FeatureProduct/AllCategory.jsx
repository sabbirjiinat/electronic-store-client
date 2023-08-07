import { useEffect, useState } from "react";
import Loader from "../../../components/shared/Loader/Loader";
import SingleFeatureProduct from "./SingleFeatureProduct";
import Container from "../../../components/shared/Container/Container";

const AllCategory = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        fetch('https://electronic-store-server.vercel.app/featureProduct')
        .then(res => res.json())
        .then(data => {
            setCategories(data)
            setLoading(false)
        })
    },[])

    if(loading){
        return <Loader/>
    }
    return (
       <Container>
         <div>
            <h2 className="text-center text-5xl font-medium bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent  p-5">Feature Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-10 ">
          {categories.map(category =><SingleFeatureProduct
            key={category._id}
            category={category}
            ></SingleFeatureProduct>)}
          </div>
        </div>
       </Container>
    );
};

export default AllCategory;