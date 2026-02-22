import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate=useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/getcart", {
        headers,
      });
      setTimeout(() => {
        setCart(response.data.data);
        setLoading(false);
      }, 200);
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/removefromcart/${bookid}`,
      {},
      { headers },
    );
    toast.success(response.data.message);
    setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
  };

  const placeOrder=async()=>{
    let load=false;
    try{
      load=true;
      const response=await axios.post("http://localhost:8000/api/v1/placeorder",{order:cart},{headers})
      load=false;
      {load && <Loader></Loader>}
      navigate("/profile/orderHisory")
      toast.info(response.data.message)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="bg-zinc-900 px-15 py-8 min-h-screen">
      {loading && <Loader></Loader>}
      {!loading && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-full flex items-center justify-center flex-col">
            <h1 className="md:text-5xl text-zinc-500 lg:text-6xl text-3xl font-semibold">Empty Cart</h1>
            <img src="./cart.png" alt="empty_cart" className="md:h-[30vh] h-[20vh] mt-10 opacity-60" />
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl font-semibold text-zinc-300 mb-8">
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center gap-3"
              key={i}
            >
              <img
                src={items.url}
                alt="img"
                className="h-[20vh] md:h-[25vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-xl md:text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-zinc-400 text-sm md:text-lg">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-center">
                <h2 className="text-zinc-100 text-xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-200 text-red-800 border border-red-800 rounded p-2 ms-12 hover:bg-red-300
                  transition-all
                  duration-250
                  active:scale-90"
                  onClick={() => deleteItem(items._id)}
                >
                  <MdDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4  w-full flex justify-end items-center">
          {" "}
          <div className="px-6 py-3 bg-zinc-800  rounded-md">
            <h1 className="text-2xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-lg text-zinc-200">
              <h2>{cart.length} books</h2>{" "}
              <h2 className="font-semibold"> ₹ {total}</h2>
            </div>
            <div className="mt-3  w-full flex justify-end">
              <button
                className="bg-green-400 text-black rounded p-2 hover:bg-white font-semibold text-lg
                  transition-all
                  duration-250
                  active:scale-90 w-full"
                  onClick={placeOrder}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
