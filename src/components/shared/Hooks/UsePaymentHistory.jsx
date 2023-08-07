import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const UsePaymentHistory = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { user } = UseAuth();
  const { data: PaymentHistoryProducts = [], refetch } = useQuery({
    queryKey: ["order", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order?userEmail=${user?.email}`);
      return res.data;
    },
  });
  return [PaymentHistoryProducts, refetch];
};

export default UsePaymentHistory;
