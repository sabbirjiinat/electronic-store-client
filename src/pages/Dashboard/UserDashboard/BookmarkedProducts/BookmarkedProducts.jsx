import { Link } from "react-router-dom";
import UseBookmark from "../../../../components/shared/Hooks/UseBookmark";
import Loader from "../../../../components/shared/Loader/Loader";
import BookmarkTable from "./BookmarkTable";

const BookmarkedProducts = () => {
  const [products, loader] = UseBookmark();

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {products && products.length > 0 && Array.isArray(products) ? (
        <div className="overflow-x-auto bg-gray-300">
          <table className="table">
            <thead>
              <tr className="text-base font-md text-gray-600">
                <th>Picture</th>
                <th>Title</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <BookmarkTable
                  key={product._id}
                  product={product}
                ></BookmarkTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center space-y-2 bg-gray-300">
          <h2 className="bg-gradient-to-r from-indigo-600 to-rose-600  text-4xl font-bold   bg-clip-text text-transparent">No Bookmarked Yet</h2>
          <Link className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-sm text-base font-medium text-gray-50" to='/'>Bookmark</Link>
        </div>
      )}
    </>
  );
};

export default BookmarkedProducts;
