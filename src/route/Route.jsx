import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/Products/SingleProduct";
import Login from "../components/shared/Login/Login";
import Register from "../components/shared/Register/Register";
import Dashboard from "../layout/Dashboard";
import BookmarkedProducts from "../pages/Dashboard/UserDashboard/BookmarkedProducts/BookmarkedProducts";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/Dashboard/AdminDashboard/AddProduct/AddProduct";
import ManageProduct from "../pages/Dashboard/AdminDashboard/ManageProduct/manageProduct";
import Payment from "../pages/Dashboard/UserDashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/UserDashboard/PaymentHistory/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/singleProduct/:id",
        element: <SingleProduct />,
        loader: ({ params }) =>
          fetch(`https://electronic-store-server.vercel.app/singleProduct/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      /* user dashboard */
      {
        path: "bookmarkedProducts",
        element: (
          <PrivateRoute>
            <BookmarkedProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment/>
          </PrivateRoute>
          
        ),
        loader:({params})=>fetch(`https://electronic-store-server.vercel.app/product/${params.id}`)
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
        <PaymentHistory/>
          </PrivateRoute>
        ),
      },
      /* Admin dashboard */
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <AdminRoute>
            <AddProduct/>
          </AdminRoute>
        ),
      },
      {
        path: "manageProduct",
        element: (
          <AdminRoute>
            <ManageProduct/>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
