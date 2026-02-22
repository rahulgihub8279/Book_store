import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../Modal/ConfirmModal";
import { useState } from "react";

export default function BookCard({ data, favourite, onRemove }) {
  const [openModal, setOpenModal] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "https://book-heaven-9n21.onrender.com/api/v1/removebookfavourite",
        {},
        { headers }
      );

      onRemove(data._id); // update UI
      toast.success(response.data.message);
      setOpenModal(false);
    } catch (err) {
      toast.error(err);
      setOpenModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-1">
      {/* Book Card */}
      <Link to={`/bookdetails/${data._id}`} className="h-full block">
        <div className="bg-transparent p-4 flex flex-col gap-3 hover:scale-[1.02] transition rounded-sm">
          <div className="w-3/4 h-3/4 flex items-center justify-center">
            <img
              src={data?.url}
              alt={data?.title}
              onError={(e) => (e.target.src = "/logo.png")}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-zinc-200 text-lg font-semibold line-clamp-2">
              {data?.title}
            </h2>
            <p className="text-zinc-400 text-sm">
              by {data?.author}
            </p>
            <p className="text-zinc-100 font-bold mt-2">
              ₹ {data?.price}
            </p>
          </div>
        </div>
      </Link>
 
      {favourite && (
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center gap-2 py-2 px-4
          text-xs text-white bg-indigo-900 rounded-md
          hover:bg-indigo-600 transition active:scale-90"
        >
          <FaHeart className="text-red-500 text-xl" />
          Remove favourite
        </button>
      )}
 
      <ConfirmModal
        isOpen={openModal}
        title="Remove Favourite"
        message="Are you want to remove book from favourites?"
        onCancel={() => setOpenModal(false)}
        onConfirm={handleRemoveBook}
      />
    </div>
  );
}
