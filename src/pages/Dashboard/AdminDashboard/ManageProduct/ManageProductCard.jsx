import { Rating } from "@smastrom/react-rating";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../components/shared/Hooks/UseAxiosSecure";
import UseManageProducts from "../../../../components/shared/Hooks/UseManageProducts";

const ManageProductCard = ({ product }) => {
  const [,refetch] = UseManageProducts()
  const { picture, name, rating, price, quantity, _id } = product;
  const [axiosSecure] = UseAxiosSecure();
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/manageProducts/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Electronic Store - Dashboard - Manage Product</title>
      </Helmet>
      <div
        className="h-96 border  border-dashed border-rose-500 rounded-md shadow-md shadow-rose-500 hover:shadow-rose-700 duration-300  
        w-full p-2
        relative 
         group flex flex-col"
      >
        <div className="overflow-hidden">
          <img
            className="w-full h-52 object-cover group-hover:scale-110 transition rounded-sm"
            src={picture}
            alt=""
          />
        </div>
        <div className="text-gray-600 text-base font-medium mt-2">
          <h2>{name}</h2>
          <p>Price : ${price}</p>
          <p className="flex items-center gap-2">
            <span>Rating : {rating}</span>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </p>
          <p>Quantity : {quantity}</p>
        </div>
        <div className="flex justify-between items-center gap-4 mt-auto">
          <Link
            to={`/singleProduct/${_id}`}
            className=" bg-gradient-to-r from-cyan-500 to-blue-500 py-1 rounded-md text-center text-xl font-medium text-gray-200 hover:text-gray-300 duration-200 w-1/2"
          >
            <button>Update</button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="bg-gradient-to-r from-rose-500 to-rose-700 py-1 rounded-md text-center text-xl font-medium text-gray-200 hover:text-gray-300 duration-200  w-1/2"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageProductCard;
