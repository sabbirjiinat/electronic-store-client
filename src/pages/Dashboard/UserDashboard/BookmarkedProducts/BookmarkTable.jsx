import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";
import UseBookmark from "../../../../components/shared/Hooks/UseBookmark";
import { Link } from "react-router-dom";
const BookmarkTable = ({ product }) => {
  const { name, picture, price, _id } = product;
  const [,,refetch] = UseBookmark()

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://electronic-store-server.vercel.app/product/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch()
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <tr className="text-base font-medium text-gray-600">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 rounded-full">
              <img src={picture} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>

      <td>{name}</td>
      <td>{price}</td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-rose-600 px-2 py-1 rounded-sm text-gray-800 flex justify-between items-center gap-1 hover:text-gray-50 transition duration-300"
        >
          <span>Delete</span> <BsTrash3 />
        </button>
      </td>
      <td>
       <Link to={`/dashboard/payment/${_id}`}>
       <button className="bg-gradient-to-r from-cyan-500 to-blue-500  px-5  py-1 rounded-sm text-gray-100 hover:text-gray-300 transition duration-300">
          Buy
        </button>
       </Link>
      </td>
    </tr>
  );
};

export default BookmarkTable;
