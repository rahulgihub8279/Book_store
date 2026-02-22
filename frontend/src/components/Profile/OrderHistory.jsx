import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { RiHistoryFill } from "react-icons/ri";
import {Link} from "react-router-dom"

export default function OrderHistory() {
  const [orderData, setOrderData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-heaven-9n21.onrender.com/api/v1/getorderhistory",
        { headers },
      );
      console.log(response.data.data);
      setOrderData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {!orderData && <Loader></Loader>}
      {orderData && orderData.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <RiHistoryFill className="text-8xl text-zinc-400 "></RiHistoryFill>
          </div>
        </div>
      )}
      {orderData && orderData.length > 0 && (
        <div className="h-full p-1 md:p-4">
          <h1 className="text-4xl text-zinc-400 mb-8 font-semibold">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded-sm py-2 px-4 flex gap-2 mb-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className=""></h1>
            </div>
            <div className="w-[15%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[6%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {orderData.map((items, i) => (
            <div className="bg-zinc-800 w-full  py-2 px-4 gap-1  hover:bg-zinc-900 hover:cursor-pointer flex transition-all duration-300">
              <div className="w-[3%]">
                <h1 className="text-center font-semibold">{i+1}</h1>
              </div>
              <div className="w-[22%] ">
                <Link to={`/bookdetails/${items.book._id}`} className="hover:to-blue-300">{items.book.title.slice(0,15)}</Link>
              </div>
              <div className="w-[45%] text-sm">
                <h1 className="">{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className="w-[15%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div> 
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {items.status==="Order Placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ): items.status==="Cancelled"?(
                    <div className="text-red-500">{items.status}</div>
                  ):(
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[6%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
