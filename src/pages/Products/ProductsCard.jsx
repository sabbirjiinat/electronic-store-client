import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductsCard = ({allProduct}) => {
    const {name,price,rating,quantity,picture,_id} = allProduct;
    return (
        <div
      className="h-96 border border-indigo-500 rounded-md shadow-md shadow-indigo-500 hover:shadow-indigo-700 duration-300  
        w-full p-2
        relative 
         group flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-52 object-cover group-hover:scale-110 transition"
          src={picture}
          alt=""
        />
      </div>
      <div className="text-gray-200 text-base font-medium mt-2">
        <h2>{name}</h2>
        <p>Price : ${price}</p>
        <p className="flex items-center gap-2"><span>Rating :  {rating}</span>
        <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
        </p>
        <p>Quantity : {quantity}</p>
      </div>
      <Link
     to={`/singleProduct/${_id}`}
        className=" bg-gradient-to-r from-indigo-500 to-indigo-700 py-1 rounded-md text-center text-xl font-medium text-gray-200 hover:text-gray-300 duration-200 mt-auto"
      >
        <button>See Details</button>
      </Link>
    </div>
    );
};

export default ProductsCard;