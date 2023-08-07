import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
import axios from "axios";
import { useEffect } from "react";

const UseAxiosSecure = () => {
  const { logOut } = UseAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://electronic-store-server.vercel.app",
  });
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Barer ${token}`;
      }
      return config;
    });
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);
  return [axiosSecure];
};

export default UseAxiosSecure;
