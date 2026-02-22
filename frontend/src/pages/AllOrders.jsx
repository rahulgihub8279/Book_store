import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserData from "./UserData";
import { toast } from "react-toastify";

export default function AllOrders() {
  const [values, setValues] = useState({}); 
  const [allOrders, setAllOrders] = useState([]);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e, orderId) => {
    setValues((prev) => ({
      ...prev,
      [orderId]: e.target.value,
    }));
  };
  const submitChanges = async (i) => {
    const order_id = allOrders[i]._id;
    const status = values[order_id];
    if (!status) {
      toast.warn("Please select a status");
      return;
    }
    const response = await axios.put(
      `http://localhost:8000/api/v1/updatestatus/${order_id}`,
      {status},
      { headers },
    );
    toast.success(response.data.message);
    setAllOrders((prev) =>
      prev.map((o) =>
        o._id === order_id ? { ...o, status } : o
      ))
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/getallorders",
        { headers },
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="h-full p-1 md:p-4">
        {!allOrders && <Loader></Loader>}
        {allOrders && allOrders.length === 0 && (
          <h1 className="text-4xl text-zinc-400 ms-5 font-semibold">
            No Orders
          </h1>
        )}
        {allOrders && allOrders.length > 0 && (
          <>
            <h1 className="text-4xl text-zinc-400 ms-5 font-semibold">
              All Orders
            </h1>
            <div className="mt-4 bg-zinc-800 w-full rounded-sm py-2 px-4 flex gap-2 items-center mb-2">
              <div className="w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              <div className="w-[21%]">
                <h1 className="">Books</h1>
              </div>
              <div className="w-[45%]">
                <h1 className="">Description</h1>
              </div>
              <div className="w-[15%]">
                <h1 className="">Price</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="">Status</h1>
              </div>
              <div className="w-none md:w-[6%] hidden md:block">
                <RiAccountCircleFill className="text-2xl" />
              </div>
            </div>
            {""}
            {allOrders.map((items, i) => (
              <div
                className="bg-zinc-800 w-full py-2 px-4 gap-1 hover:bg-zinc-900 hover:cursor-pointer flex transition-all duration-250"
                key={i}
              >
                <div className="w-[3%]">
                  <h1 className="text-center font-semibold">{i + 1}</h1>
                </div>
                {""}
                <div className="w-[22%] ">
                  {items.book ? (
                    <Link
                      to={`/bookdetails/${items.book._id}`}
                      className="hover:text-blue-400"
                    >
                      {items.book.title.slice(0, 30)}...
                    </Link>
                  ) : (
                    <span className="text-red-400 italic">Book deleted</span>
                  )}
                </div>
                {""}
                <div className="w-[45%] text-sm">
                  <h1 className="">
                    {items.book ? items.book.desc.slice(0, 60) + "..." : "N/A"}
                  </h1>
                </div>{" "}
                <div className="w-[15%]">
                  <h1 className="">
                    ₹ {items.book ? items.book.price : "N/A"}
                  </h1>
                </div>{" "}
                <div className="w-[16%]">
                  <h1 className="font-semibold">
                    <button className="hover:scale-105 transition-all duration-300">
                      {items.status === "Order Placed" ? (
                        <div className="text-yellow-500">{items.status}</div>
                      ) : items.status === "Cancelled" ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-green-500">{items.status}</div>
                      )}
                    </button>
                    <div className="flex">
                      <select
                        name="status"
                        id=""
                        className="bg-zinc-800  w-full text-sm"
                        onChange={(e) => change(e, items._id)}
                        value={values[items._id] || items.status}
                      >
                        {[
                          "Delivered",
                          "Order Placed",
                          "Out for delivery",
                          "Cancelled",
                        ].map((items, i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-red-600 mx-2"
                        onClick={() => { 
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>{" "}
                <div className="w-[10%] md:w-[6%]">
                  <button
                    className="text-2xl hover:text-orange-600 active:scale-90 transition-all duration-200 hover:scale-110"
                    onClick={() => {
                      setUserDiv("fixed");
                      setUserDivData(items.user);
                    }}
                  >
                    <FiExternalLink />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {userDivData && (
        <UserData
          userDiv={userDiv}
          userDivData={userDivData}
          setUserDiv={setUserDiv}
        ></UserData>
      )}
    </>
  );
}
