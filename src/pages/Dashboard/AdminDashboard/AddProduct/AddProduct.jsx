import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../../components/shared/Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const image_url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    const formData = new FormData();
    formData.append("image", data.picture[0]);
    setLoader(true);
    fetch(image_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((img_data) => {
        if (img_data.status === 200) {
          const image_link = img_data.data.display_url;
          const { name, price, category, rating, description, quantity } = data;
          const electronic_device = {
            name,
            price: parseFloat(price),
            category,
            rating: parseFloat(rating),
            description: description,
            quantity: parseFloat(quantity),
            picture: image_link,
          };
          axiosSecure.post("/allProducts", electronic_device).then((res) => {
            if (res.data.insertedId) {
              setLoader(false);
              Swal.fire("Success!", "Your file has been uploaded.", "success");
            }
          });
        }
      });
  };

  return (
    <div className="bg-gray-300 w-full h-screen p-2">
      <h2 className="text-center text-5xl bg-gradient-to-r from-indigo-600 to-rose-600 font-bold bg-clip-text text-transparent py-5">
        Add a Product
      </h2>
      <Helmet>
              <title>Electronic Store - Dashboard - Add Product </title>
            </Helmet>
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
              type="text"
              name="name"
              id=""
              placeholder="Name"
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
              htmlFor="name"
            >
              Quantity
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              name="price"
              id=""
              placeholder="Price"
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
              htmlFor="category"
            >
              Category
            </label>

            <select
              className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
              {...register("category", { required: true })}
            >
              <option disabled selected={true}>
                Select One
              </option>
              <option value="iphones">iPhone</option>
              <option value="computers">Computer</option>
              <option value="laptops">Laptop</option>
              <option value="ipads">iPad</option>
              <option value="watches">Watch</option>
              <option value="keyboards">Keyboard</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm font-normal">
                Category is required !
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label
              className="font-medium text-base text-gray-600 py-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              {...register("rating", { required: true })}
              type="number"
              name="rating"
              id=""
              placeholder="Rating"
              className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
            />
            {errors.rating && (
              <p className="text-red-600 text-sm font-normal">
                Name is required !
              </p>
            )}
          </div>
        </div>

        <div className="flex  items-center gap-4">
          <div className="w-1/2">
            <label
              className="font-medium text-base text-gray-600 py-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              {...register("quantity", { required: true })}
              type="number"
              name="quantity"
              id=""
              placeholder="Quantity"
              className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
            />
            {errors.quantity && (
              <p className="text-red-600 text-sm font-normal">
                Quantity is required !
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label
              className="font-medium text-base text-gray-600 py-2"
              htmlFor="quantity"
            >
              Image
            </label>

            <input
              {...register("picture", { required: true })}
              type="file"
              name="picture"
              className="w-full"
            />
            {errors.image && (
              <p className="text-red-600 text-sm font-normal">
                Image is required !
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <label
            className="font-medium text-base text-gray-600 py-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="w-full py-1 px-4 rounded-md border border-gray-400 focus:outline-dashed focus:outline-rose-600 bg-transparent placeholder-gray-500"
            name="description"
            id=""
            cols="2"
            rows="2"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p className="text-red-600 text-sm font-normal">
              Description is required !
            </p>
          )}
        </div>
        <button
          className="bg-gradient-to-r from-indigo-700 to-rose-700 w-full px-2 py-2 rounded-md text-xl font-semibold text-gray-200 hover:text-gray-300 transition"
          type="submit"
        >
          {loader ? (
            <ScaleLoader height={15} speedMultiplier={2} color="#36d7b7" />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
