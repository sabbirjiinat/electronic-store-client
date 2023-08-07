import { Link } from "react-router-dom";
import UsePaymentHistory from "../../../../components/shared/Hooks/UsePaymentHistory";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistory = () => {
    const [PaymentHistoryProducts] = UsePaymentHistory()
    return (
        <div className="bg-gray-300 w-full h-screen p-2">
        
          {/* <h2 className="text-center text-5xl bg-gradient-to-r from-indigo-600 to-rose-600 font-bold bg-clip-text text-transparent py-5">Payment History</h2>  */}
        
        {PaymentHistoryProducts && PaymentHistoryProducts.length > 0 && Array.isArray(PaymentHistoryProducts) ?
              <div className="overflow-x-auto bg-gray-300">
              <table className="table">
                <thead>
                  <tr className="text-base font-md text-gray-600">
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Paid Status</th>
                    <th>Transition Id</th>
                  </tr>
                </thead>
                <tbody>
                  {PaymentHistoryProducts.map((PaymentHistoryProduct) => (
                    <PaymentHistoryTable
                      key={PaymentHistoryProduct._id}
                      PaymentHistoryProduct={PaymentHistoryProduct}
                    ></PaymentHistoryTable>
                  ))}
                </tbody>
              </table>
            </div>
              :
              <div className="h-screen flex flex-col justify-center items-center space-y-2 bg-gray-300">
              <h2 className="bg-gradient-to-r from-indigo-600 to-rose-600  text-4xl font-bold   bg-clip-text text-transparent">No Purchase Product Yet</h2>
              <Link className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-sm text-base font-medium text-gray-50" to='/dashboard/bookmarkedProducts'>Purchase</Link>
            </div>
        }
        </div>
    );
};

export default PaymentHistory;