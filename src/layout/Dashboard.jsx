import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import UseAuth from "../components/shared/Hooks/UseAuth";
import { MdPayment } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import { FcElectroDevices } from "react-icons/fc";
import { TbBrandProducthunt } from "react-icons/tb";
import UseAdmin from "../components/shared/Hooks/useAdmin";
import { Helmet } from "react-helmet-async";
const Dashboard = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const [isAdmin] = UseAdmin();

  return (
    <div className="drawer lg:drawer-open">
        <Helmet>
              <title>Electronic Store - Dashboard</title>
            </Helmet>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col pl-52">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side fixed">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-2 flex flex-col  h-screen text-gray-100 bg-black fixed z-10 w-52 ">
          <>
            {isAdmin && (
              <>
                <div className="flex flex-col items-center mb-10">
                  <Link to="/">
                    <img
                      className="rounded-full border-4 border-dashed border-r-rose-600 border-l-indigo-600 border-t-teal-600 border-b-sky-600 cursor-pointer w-32 h-32"
                      title="Home"
                      src={user?.photoURL}
                      alt=""
                    />
                  </Link>
                  <p className="text-gray-400 font-medium my-1 underline ">
                    {user?.email}
                  </p>
                </div>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `font-medium text-base text-gray-100 flex items-center  ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600"
                          : ""
                      }`
                    }
                    to="/dashboard/manageUsers"
                  >
                    <span>Manage Users</span> <FaUsersCog />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `font-medium text-base text-gray-100 flex items-center ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600"
                          : ""
                      }`
                    }
                    to="/dashboard/addProduct"
                  >
                    <span>Add Product</span>
                    <FcElectroDevices />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `font-medium text-base text-gray-100 flex items-center ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600"
                          : ""
                      }`
                    }
                    to="/dashboard/manageProduct"
                  >
                    <span>Manage Product</span>
                    <TbBrandProducthunt />
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && user && user.email && (
              <>
                <div className="flex flex-col items-center mb-10">
                  <Link to="/">
                    <img
                      className="rounded-full border-4 border-dashed border-r-rose-600 border-l-indigo-600 border-t-teal-600 border-b-sky-600 cursor-pointer w-32 h-32 object-cover"
                      title="Home"
                      src={user?.photoURL}
                      alt=""
                    />
                  </Link>
                  <p className="text-gray-400 font-medium my-1 underline ">
                    {user?.email}
                  </p>
                </div>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `font-medium text-base text-gray-100 flex items-center  ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600"
                          : ""
                      }`
                    }
                    to="/dashboard/bookmarkedProducts"
                  >
                    <span>Bookmark </span> <FcElectroDevices />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `font-medium text-base text-gray-100 flex items-center ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600"
                          : ""
                      }`
                    }
                    to="/dashboard/paymentHistory"
                  >
                    <span>Payment History</span>
                    <MdPayment />
                  </NavLink>
                </li>
              </>
            )}
          
          </>
          <button
            onClick={() => {
              logOut();
              navigate("/");
            }}
            className="font-medium text-base text-gray-100
                          bg-gradient-to-r from-lime-600 to-blue-600  mt-auto flex justify-center items-center gap-3 py-1 rounded-sm"
          >
            <span>Logout</span> <FiLogOut />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
