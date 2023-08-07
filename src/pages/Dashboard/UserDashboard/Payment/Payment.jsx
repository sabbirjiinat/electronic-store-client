import { Rating } from "@smastrom/react-rating";
import { Helmet } from "react-helmet-async";
import { ScaleLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
  const paymentProduct = useLoaderData();


  const {
    // bookmarkedId,
    name,
    picture,
    price,
    userEmail,
    userName,
    category,
    _id,
    rating,
  } = paymentProduct;
  const [loader, ] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.paymentProductId = _id;
    data.productName = name;
    data.category = category
    data.userEmail = userEmail,
    // setLoader(true)

    fetch(`https://electronic-store-server.vercel.app/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data =>{
        window.location.replace(data.url)
    })
  };
  return (
    <div className="px-4 bg-gray-300 h-screen">
      <Helmet>
        <title>Dashboard - Payment</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-700 to-rose-700 bg-clip-text text-transparent py-4">
        Purchase {name}
      </h1>

      <div
        className="border border-indigo-500 rounded-md shadow-md shadow-indigo-500 hover:shadow-indigo-700 duration-300  
          w-full p-2
          relative 
            flex  gap-5"
      >
        <div className="overflow-hidden  w-2/3">
          <img
            className="w-full h-40 object-cover hover:scale-110 transition"
            src={picture}
            alt=""
          />
        </div>
        <div className="text-gray-600 text-base font-medium mt-2 w-1/3 space-y-3">
          <h2>{name}</h2>
          <p>Price : ${price}</p>
          <p className="flex items-center gap-2">
            <span>Rating : {rating}</span>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </p>
        </div>
      </div>
      <div className="py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" action="">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name", { required: true })}
                defaultValue={userName}
                type="text"
                name="name"
                id=""
                placeholder="Write Your Name"
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              />
              {errors.name && (
                <p className="text-red-600 text-sm font-normal">
                  Name is required !
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                defaultValue={userEmail}
                readOnly
                type="email"
                name="email"
                id=""
                placeholder="Write Your Email"
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="number"
              >
                Mobile Number
              </label>
              <input
                {...register("number", { required: true })}
                type="number"
                name="number"
                id=""
                placeholder="Write Your Mobile No:"
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              />
              {errors.number && (
                <p className="text-red-600 text-sm font-normal">
                  Mobile no: is required !
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="name"
              >
                Post Code
              </label>
              <input
                {...register("postCode", { required: true })}
                type="number"
                name="postCode"
                id=""
                placeholder="Post Code"
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              />
              {errors.price && (
                <p className="text-red-600 text-sm font-normal">
                  Price is required !
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="currency"
              >
                Currency
              </label>

              <select
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
                {...register("currency", { required: true })}
              >
                <option disabled selected={true}>
                  Select One
                </option>
                <option value='BDT'>BDT</option>
              </select>
              {errors.currency && (
                <p className="text-red-600 text-sm font-normal">
                  Currency is required !
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                className="font-medium text-base text-gray-600 py-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                {...register("address", { required: true })}
                type="text"
                name="address"
                id=""
                placeholder="Write Your Address"
                className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              />
              {errors.address && (
                <p className="text-red-600 text-sm font-normal">
                  Address is required !
                </p>
              )}
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-indigo-700 to-rose-700 w-full px-2 py-2 rounded-md text-xl font-semibold text-gray-200 hover:text-gray-300 transition"
            type="submit"
          >
            {loader ? (
              <ScaleLoader height={15} speedMultiplier={2} color="#36d7b7" />
            ) : (
              "Purchase"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
