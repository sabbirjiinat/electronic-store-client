import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import UseAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { user,logOut } = UseAuth();
  const navigate = useNavigate()
  const navItem = (
    <div className="md:flex space-x-7 text-lg font-medium">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text  text-transparent"
              : ""
          }`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text  text-transparent"
              : ""
          }`
        }
        to="/products"
      >
        Products
      </NavLink>
    {user &&   <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text  text-transparent"
              : ""
          }`
        }
        to="/dashboard"
      >
       Dashboard
      </NavLink>}
      {user  && <button onClick={()=>{
        logOut()
        navigate('/')
      }} className="font-medium bg-gradient-to-r from-indigo-700  to-rose-700 px-2 rounded-sm ">Logout</button>}
    </div>
  );
  return (
    <Container>
      <div className="navbar py-4 text-gray-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 "
            >
              {navItem}
            </ul>
          </div>
          <h3 className="text-lg font-medium ">
            <span className="bg-gradient-to-r from-indigo-700 to-rose-800  bg-clip-text text-transparent font-medium text-lg">
              Electronic
            </span>{" "}
            Store
          </h3>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>

        {user ? (
          <>
            <div
              // onClick={() => setToggle(true)}
              className="avatar navbar-end flex justify-end"
            >
              <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} />
              </div>
            </div>
            {/* <div className="relative">
              <div
                className={`text-gray-300 text-lg absolute  font-medium ${
                  toggle ? "top-60" : "top-60"
                }rounded-md  shadow-md shadow-slate-300 bg-gray-600 w-32  z-10`}
              >
                <div className="p-2">
                  <Link to="/signup">Logout</Link>
                </div>

                <RxCross2 className="absolute top-0 right-0  w-6 h-6 cursor-pointer text-rose-600" />
              </div>
            </div> */}
          </>
        ) : (
          <div className="ml-auto text-lg font-medium bg-gradient-to-r from-indigo-700  to-rose-700 px-2 rounded-sm ">
            <Link to="/login">Login</Link>

          </div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;
