import Sidebar from "../components/Profile/Sidebar";
import {Outlet} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  // const isLoggedIn=useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/getuserinfo",
        { headers },
      );
      setProfile(response.data);
      console.log(response.data);
    };
    fetch();
  }, []);
  return (
    <div className="w-full h-screen text-white bg-zinc-900 px-2 py-8 md:px-12 flex flex-col md:flex-row gap-6">
      {!profile && <Loader></Loader>}
      {profile && (
        <>
          <div className="w-full md:w-2/6">
            <Sidebar data={profile}></Sidebar>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet></Outlet>
          </div>
        </>
      )}
    </div>
  );
}
