import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { useState } from "react";

const UseManageProducts = () => {
  const [axiosSecure] = UseAxiosSecure()
  const [loader,setLoader] = useState(false)
  const {data:products = [], refetch} = useQuery({
    queryKey:['manageProducts'],
    queryFn:async()=>{
        setLoader(true)
        const res = await axiosSecure.get('/manageProducts');
        setLoader(false)
        return res.data;
    }
  })
  return [products,refetch,loader]
};

export default UseManageProducts;