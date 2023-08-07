import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";

const UseUsers = () => {
  const { user } = UseAuth();
  const [loader, setLoader] = useState(false);
  const [axiosSecure] = UseAxiosSecure()
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", user],
    queryFn: async () => {
      setLoader(true);
      const res = await axiosSecure.get(`/users`);
      setLoader(false);
      return res.data;
    },
  });
  return [users, loader, refetch];
};

export default UseUsers;
