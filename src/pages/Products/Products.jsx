import { useEffect, useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import ProductsCard from "./ProductsCard";
import Container from "../../components/shared/Container/Container";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const category = params.get("category");
  useEffect(() => {
    setLoader(true);
    fetch("https://electronic-store-server.vercel.app/allProducts")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const filtered = data.filter(
            (product) => product.category === category
          );
          setAllProducts(filtered);
          setLoader(false);
        } else {
          setAllProducts(data);
          setLoader(false);
        }
      });
  }, [category]);

  if (loader) {
    return <Loader />;
  }

  return (
    <Container>
      <Helmet>
        <title>Electronic Store - Products</title>
      </Helmet>
      <div>
        <h2 className="text-center text-5xl font-medium bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent  pt-5 pb-10">
          {category ? (
            <h2 className="uppercase">{category}</h2>
          ) : (
            "All Products"
          )}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {allProducts.map((allProduct) => (
            <ProductsCard
              key={allProduct._id}
              allProduct={allProduct}
            ></ProductsCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;
