import { Link, useNavigate, useSearchParams } from "react-router-dom";
import queryString from 'query-string';
const SingleFeatureProduct = ({ category }) => {
  const { name, image, price } = category;
  const [params] = useSearchParams()
  
  const navigate = useNavigate()


  const handleClick = () =>{
    let currentQuery = {};
    if(params){
      currentQuery = queryString.parse(params.toString())
    }
    const updatedQuery = {
      ...currentQuery, category: category.category
    }
   const  url = queryString.stringifyUrl({
      url:'/products',
      query:updatedQuery
    },{skipNull:true})
    navigate(url)
  }
  return (
    <div
      className="h-96 border border-indigo-500 rounded-md shadow-md shadow-indigo-500 hover:shadow-indigo-700 duration-300  
        w-full p-2
        relative 
         group flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-60 object-cover group-hover:scale-110 transition"
          src={image}
          alt=""
        />
      </div>
      <div className="text-gray-200 text-base font-medium mt-2">
        <h2>{name}</h2>
        <p>Price: ${price}</p>
      </div>
      <Link
      onClick={handleClick}
        className=" bg-gradient-to-r from-indigo-500 to-indigo-700 py-1 rounded-md text-center text-xl font-medium text-gray-200 hover:text-gray-300 duration-200 mt-auto"
      >
        <button>See Product</button>
      </Link>
    </div>
  );
};

export default SingleFeatureProduct;
