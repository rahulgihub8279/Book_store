import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";

export default function Sidebar({ data }) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const role=useSelector((state)=>state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 h-screen rounded-md flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="" className="h-[12vh] mt-5" />
        <p className="mt-3 font-semibold text-zinc-200">{data.username}</p>
        <p className="mb-3  font-light text-sm">{data.email}</p>
        <div className="mt-6 bg-zinc-300 h-px w-full hidden md:flex"></div>
      </div>

      {role==="user" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex text-lg">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHisory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>  
      </div>
      )}
      {role==="admin" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex text-lg">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          All Orders
        </Link>
        <Link
          to="/profile/addbook"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div>
      )}
      <button className="flex gap-2 items-center px-8 text-white text-md font-semibold py-2 rounded-md bg-red-800 hover:bg-red-600 transition-all duration-250 mt-8 active:scale-90"
      onClick={()=>{
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        toast.info("log out successfully")
        navigate("/")
      }}
      >
        Logout <MdOutlineLogout />
      </button>
    </div>
  );
}
