import { Helmet } from "react-helmet-async";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";
import UseUsers from "../../../../components/shared/Hooks/UseUsers";

const UsersTable = ({ allUser }) => {
  const { email, name, photo, _id } = allUser;

  const [, , refetch] = UseUsers();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://electronic-store-server.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                ` ${name} is Deleted Successfully`,
                "success"
              );
            }
          });
      }
    });
  };

  const makeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Make ${user?.name} an Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://electronic-store-server.vercel.app/users/admin/${user?._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch()
              Swal.fire(
                "Make Admin",
                `${user.name} is now an Admin`,
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <tr className="text-base font-medium text-gray-600">
      <Helmet>
        <title>Electronic Store - Dashboard - Manage User</title>
      </Helmet>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 rounded-full">
              <img src={photo} alt="User Photo" />
            </div>
          </div>
        </div>
      </td>

      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-rose-600 px-2 py-1 rounded-sm text-gray-900 flex justify-between items-center gap-1 hover:text-gray-700 transition duration-300"
        >
          <span>Delete</span> <BsTrash3 />
        </button>
      </td>
      <td>
        {allUser.role === "admin" ? (
          "Admin"
        ) : (
          <button
            onClick={() => makeAdmin(allUser)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500  px-5  py-1 rounded-sm text-gray-100 hover:text-gray-300 transition duration-300"
          >
            Create Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UsersTable;
