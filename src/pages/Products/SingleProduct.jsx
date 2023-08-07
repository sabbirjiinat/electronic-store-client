import { useLoaderData, useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Container from "../../components/shared/Container/Container";
import Swal from "sweetalert2";
import UseAuth from "../../components/shared/Hooks/UseAuth";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
const SingleProduct = () => {
  const singleProduct = useLoaderData();
  const { name, price, rating, quantity, picture, description,_id,category
  } = singleProduct;
  const { user } = UseAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleBookmark = (user) => {
    const product = {
      name,
      price:parseFloat(price),
      picture,
      bookmarkedId:_id,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      userName: user?.displayName,
      rating,
      category

    };
    if (user && user.email) {
      setLoading(true);
      fetch(`https://electronic-store-server.vercel.app/product?email=${user?.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setLoading(false);
            Swal.fire(
              "Bookmarked !",
              "Your can buy this product now",
              "success"
            );
          }
        });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You need to login for bookmark",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login");
        }
      });
    }
  };
  return (
    <Container>
      <div
        className="border border-indigo-500 rounded-md shadow-md shadow-indigo-500 hover:shadow-indigo-700 duration-300  
          w-full p-2
          relative 
            flex  gap-5"
      >
        <div className="overflow-hidden  w-1/3">
          <img
            className="w-full h-full object-cover hover:scale-110 transition"
            src={picture}
            alt=""
          />
        </div>
        <div className="text-gray-200 text-base font-medium mt-2 w-2/3 space-y-3">
          <h2>{name}</h2>
          <p>Price : ${price}</p>
          <p className="flex items-center gap-2">
            <span>Rating : {rating}</span>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </p>
          <p>Quantity : {quantity}</p>
          <p>{description}</p>
          <div
            onClick={() => handleBookmark(user)}
            className=" bg-gradient-to-r from-indigo-400 to-indigo-700 py-1 rounded-md text-center text-xl font-medium cursor-pointer"
          >
            <button>
              {loading ? (
                <ScaleLoader height={15} speedMultiplier={2} color="#36d7b7" />
              ) : (
                "Add To Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProduct;
