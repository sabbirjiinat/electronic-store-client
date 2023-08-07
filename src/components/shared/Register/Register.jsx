import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import SaveUserToDb from "../../../api/SaveUserToDb";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [userError, setUserError] = useState("");
  const { createUserWithEmail, updateUserProfile, googleLogin } = UseAuth();
  const [loader, setLoader] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setUserError("");
    if (data.password !== data.confirm) {
      return setUserError("Password did not match");
    }
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    setLoader(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const image_url = imageData.data.display_url;
        createUserWithEmail(data.email, data.password)
          .then((result) => {
            const singInUser = result.user;
            updateUserProfile(data.name, image_url)
              .then(() => {
                SaveUserToDb(singInUser);
                setLoader(false);
                navigate(from, {replace:true})
                toast.success("You have signUp successfully");
              })
              .catch((err) => {
                toast.error(err.message);
                setLoader(false);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            setLoader(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setLoader(false);
      });
  };

  const loginWithGoogle = () => {
    setLoader(true);
    googleLogin()
      .then((result) => {
        const currentUser = result.user;
        SaveUserToDb(currentUser);
        setLoader(false);
        navigate(from, {replace:true})
        toast.success("You have login successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoader(false);
      });
  };
  return (
    <Container>
      <Helmet>
        <title>Electronic Store - Sign Up</title>
      </Helmet>
      <div className="w-full flex justify-center pt-10">
        <div className="border-[1px] border-gray-600 rounded-md flex flex-col px-10 pb-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="space-y-5"
          >
            <h2 className="text-center text-5xl font-medium bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent  p-5 ">
              Sign Up Here
            </h2>
            <div className="w-full">
              <label
                className="text-base text-gray-200 font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                id=""
                className="block w-full py-1 px-2  bg-transparent focus:outline-none text-gray-100 border-b focus:border-rose-500 transition-colors"
                placeholder="Write Your Name"
              />
              {errors.name && (
                <p className="text-red-600">Name is required !!</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="text-base text-gray-200 font-medium"
                htmlFor="name"
              >
                Photo
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="block w-full py-1 px-2   text-gray-100"
              />
              {errors.photo && (
                <p className="text-red-600">Image is required !!</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="text-base text-gray-200 font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id=""
                className="block w-full py-1 px-2  bg-transparent focus:outline-none text-gray-100 border-b focus:border-rose-500 transition-colors"
                placeholder="Write Your Email"
              />
              {errors.email && (
                <p className="text-red-600">Email is required !!</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="text-base text-gray-200 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id=""
                className="block w-full py-1 px-2  bg-transparent focus:outline-none text-gray-100 border-b focus:border-rose-500 transition-colors"
                placeholder="*****"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required !!</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="text-base text-gray-200 font-medium"
                htmlFor="confirm"
              >
                Confirm Password
              </label>
              <input
                {...register("confirm", { required: true })}
                type="password"
                name="confirm"
                id=""
                className="block w-full py-1 px-2  bg-transparent focus:outline-none text-gray-100 border-b focus:border-rose-500 transition-colors"
                placeholder="*****"
              />
              {errors.confirm?.type === "required" && (
                <p className="text-red-600">Password is required !!</p>
              )}
              <p className="text-red-600">{userError}</p>
            </div>

            <button
              type="submit"
              className="block w-full py-1 px-2 text-center text-lg font-medium bg-gradient-to-r from-indigo-700  to-rose-700 cursor-pointer text-gray-300 rounded-sm"
            >
              {loader ? (
                <ScaleLoader height={15} speedMultiplier={2} color="#36d7b7" />
              ) : (
                "Next"
              )}
            </button>
          </form>
          <div className="flex items-center text-gray-300 font-medium my-4 space-x-3 ">
            <p>Have an Account ? </p>
            <Link
              className="bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent "
              to="/login"
            >
              Login
            </Link>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="border-b w-1/2"></p>
            <p className="text-gray-300">OR</p>
            <p className="border-b w-1/2"></p>
          </div>

          <button
            onClick={loginWithGoogle}
            className="flex justify-between items-center gap-2 my-2  font-medium border rounded-sm w-fit p-1 text-gray-300 text-base"
          >
            <span>Login With Google</span> <FcGoogle className="h-6 w-6" />
          </button>
        </div>
      </div>
      <Toaster />
    </Container>
  );
};

export default Register;
