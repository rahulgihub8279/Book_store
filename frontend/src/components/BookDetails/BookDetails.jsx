import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { FaHeart,FaEdit } from "react-icons/fa"; 
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function BookDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const handleFavourite= async()=>{
    const headers={
      bookid:id,
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const response=await axios.put("http://localhost:8000/api/v1/addbooktofavoutite",{},{headers});
    toast.success(response.data.message)
  }
  const handleCart=async()=>{
    const headers={
      bookid:id,
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const response=await axios.put("http://localhost:8000/api/v1/addtocart",{},{headers});  
    toast.success(response.data.message)
  }
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/getbookbyid/${id}`
        );
        setTimeout(() => {
          setData(response.data.data);
          setLoading(false);
        }, 200);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }; 
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-zinc-900 min-h-screen flex justify-center pt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen px-4 sm:px-8 lg:px-12 py-6">
      {" "}
      <div className="flex flex-col lg:flex-row gap-10">
        {" "}
        <div className="bg-zinc-950 rounded-lg p-4 flex flex-col lg:flex-row justify-center  items-center w-full lg:w-1/2 gap-8">
          <img
            src={Data?.url}
            alt={Data?.title}
            className="w-full max-h-[50vh] sm:max-h-[60vh] lg:max-h-[85vh] object-contain"
            onError={(e) => (e.target.src = "/logo.png")}
          />

          {isLoggedIn && (
            <div className="flex h-full flex-row lg:flex-col gap-10">
              {" "}
              <button className="bg-zinc-300 rounded-full text-blue-700 p-3 text-2xl sm:text-3xl hover:bg-zinc-700 hover:scale-110 transition"
              onClick={handleCart}>
                <IoCart />
              </button>
              <button className="bg-zinc-300 text-red-700 rounded-full p-3 text-2xl sm:text-3xl hover:bg-zinc-700 hover:scale-110 transition" onClick={handleFavourite}>
                <FaHeart />
              </button>
            </div>
          )}

          {isLoggedIn && role === "admin" && (
            <div className="flex h-full flex-row lg:flex-col gap-10">
              <button className="bg-zinc-300 rounded-full text-blue-700 p-3 text-2xl sm:text-3xl hover:bg-zinc-700 hover:scale-110 transition">
                <FaEdit />
              </button> 
              <button className="bg-zinc-300 rounded-full text-red-700 p-3 text-2xl sm:text-3xl hover:bg-zinc-700 hover:scale-110 transition">
                <MdDelete />
              </button> 
            </div>
          )}
        </div>
 
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-4xl text-zinc-200 font-semibold">
            {Data?.title}
          </h1>

          <p className="text-sm sm:text-lg text-zinc-400">
            by {Data?.author}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {expanded || Data.desc.length <= 300
              ? Data.desc
              : Data.desc.slice(0, 300) + "..."}
          </p>

          {Data.desc.length > 300 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-sm hover:underline w-fit"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}

          <p className="text-lg sm:text-2xl font-semibold text-zinc-200 mt-4">
            ₹ {Data?.price}
          </p>
        </div>
      </div>
    </div>
  );
}
