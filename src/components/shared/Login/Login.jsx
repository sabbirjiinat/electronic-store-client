import { Toaster, toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import { FcGoogle } from "react-icons/fc";
import SaveUserToDb from "../../../api/SaveUserToDb";

const Login = () => {
    const [loader,setLoader] = useState(false)
    const {signInWithEmail,googleLogin} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        setLoader(true)
        signInWithEmail(data.email,data.password)
        .then(() =>{
            setLoader(false)
            reset()
            navigate(from, {replace:true})
            toast.success('You have login successfully')
        }).catch(err =>{
            toast.error(err.message)
            setLoader(false)
        })
       
      }

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
          <title>Electronic Store - Login</title>
        </Helmet>
        <div className="w-full flex justify-center pt-10">
          <div className="border-[1px] border-gray-600 rounded-md flex flex-col px-10 pb-5 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="space-y-5"
            >
              <h2 className="text-center text-5xl font-medium bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent  p-5 ">
                Login Here
              </h2>
             
             
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
            <div className="flex items-center text-gray-300 font-medium my-4 space-x-3">
              <p>Don`t have any account yet ? </p>
              <Link
                className="bg-gradient-to-r from-indigo-700  to-rose-700  bg-clip-text text-transparent "
                to="/signup"
              >
                Signup
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

export default Login;