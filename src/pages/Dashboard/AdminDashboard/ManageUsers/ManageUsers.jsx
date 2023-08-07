import { Link } from "react-router-dom";
import UseUsers from "../../../../components/shared/Hooks/UseUsers";
import Loader from "../../../../components/shared/Loader/Loader";
import UsersTable from "./UsersTable";

const ManageUsers = () => {
  const [users, loader] = UseUsers();
  if (loader) {
    return <Loader />;
  }
  return (
    <>
  
        {users && users.length > 0 && Array.isArray(users) ? (
          <div className="overflow-x-auto bg-gray-300">
            <table className="table">
              <thead>
                <tr className="text-base font-md text-gray-600">
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((allUser) => (
                  <UsersTable key={allUser._id} allUser={allUser}></UsersTable>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center space-y-2 bg-gray-300">
            <h2 className="bg-gradient-to-r from-indigo-600 to-rose-600  text-4xl font-bold   bg-clip-text text-transparent">
              No Bookmarked Yet
            </h2>
            <Link
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-sm text-base font-medium text-gray-50"
              to="/"
            >
              Bookmark
            </Link>
          </div>
        )}
      </>
 
  );
};

export default ManageUsers;
