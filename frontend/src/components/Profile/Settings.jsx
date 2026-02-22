import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

export default function Settings() {
  const [value, setValue] = useState({ address: "" });
  const [profiledata, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-heaven-9n21.onrender.com/api/v1/getuserinfo",
        { headers },
      );
      setValue({ address: response.data.address });
      setProfileData(response.data);
    };
    fetch();
  }, []);
  const change = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitAddress = async () => {
    const response = await axios.put(
      "https://book-heaven-9n21.onrender.com/api/v1/updateaddress",
      { address: value.address },
      { headers },
    );
    toast.success(response.data.message);
  };
  return (
    <>
      {!profiledata && <Loader></Loader>}{" "}
      {profiledata && (
        <div className="h-full p-0 md:p-4 text-zinc-100 ">
          <h1 className="text-4xl text-zinc-400 mb-8 font-semibold">
            Settings
          </h1>
          <div className="flex gap-4 flex-col px-10">
            <div className="mt-3">
              <label htmlFor="" className="text-lg">
                Username
              </label>
              <p className="p-2  w-3/5 rounded bg-zinc-800 mt-2 font-semibold border-b">
                {profiledata.username}
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-lg">
                Email
              </label>
              <p className="p-2 w-3/5 rounded bg-zinc-800 mt-2 font-semibold border-b">
                {profiledata.email}
              </p>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <label htmlFor="" className="text-lg">
                Address
              </label>
              <textarea
                rows={4}
                required
                name="address"
                value={value.address}
                onChange={change}
                className="w-3/5 mt-0 px-3 py-1 bg-zinc-800 resize-none  outline-none rounded-sm text-white"
              />
            </div>
            <button
              className="bg-amber-300 w-[20%] ml-10 mt-5 font-semibold text-black rounded px-4 py-2 hover:bg-yellow-700
                  transition-all
                  duration-250
                  active:scale-90"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
          <div className="mt-4 flex justify-end"></div>
        </div>
      )}
    </>
  );
}
