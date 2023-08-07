import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";

const UseBookmark = () => {
  const [loader, setLoader] = useState(false);
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["product", user?.email],
    enabled: !loading,
    queryFn: async () => {
      setLoader(true);
      const res = await axiosSecure.get(`/product?userEmail=${user?.email}`);
      setLoader(false);
      return res.data;
    },
  });
  return [products, loader, refetch];
};

export default UseBookmark;
