import { Link } from "react-router-dom";
import UseManageProducts from "../../../../components/shared/Hooks/UseManageProducts";
import Loader from "../../../../components/shared/Loader/Loader";
import ManageProductCard from "./ManageProductCard";

const ManageProduct = () => {
  const [products, , loader] = UseManageProducts();
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="bg-gray-300 w-full h-screen p-2">
      <h2 className="text-center text-5xl bg-gradient-to-r from-indigo-600 to-rose-600 font-bold bg-clip-text text-transparent py-5">
        Manage Product
      </h2>
      <>
        {products && products.length > 0 && Array.isArray(products) ? (
          <div className="bg-gray-300 grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((product) => (
              <ManageProductCard
                key={product._id}
                product={product}
              ></ManageProductCard>
            ))}
          </div>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center space-y-2 bg-gray-300">
            <h2 className="bg-gradient-to-r from-indigo-600 to-rose-600  text-4xl font-bold   bg-clip-text text-transparent">
              No Bookmarked Yet
            </h2>
            <Link
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-sm text-base font-medium text-gray-50"
              to="/"
            >
              Bookmark
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

export default ManageProduct;
