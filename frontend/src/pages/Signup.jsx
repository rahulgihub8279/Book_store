import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        !values.username ||
        !values.password ||
        !values.email ||
        !values.address
      ) {
        toast.warn("all fields are required !");
        return;
      }
      const payload = {
        username: String(values.username).trim(),
        email: String(values.email).trim(),
        password: String(values.password).trim(),
        address: String(values.address).trim(),
      };
      const response = await axios.post(
        "http://localhost:8000/api/v1/signup",
        payload,
      );
      const message = response.data.message;
      const token = response.data.token;
      const role = response.data.newUser.role;
      const id = response.data.newUser._id; 
      
      dispatch(authActions.login({ role }));
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
      navigate("/");
      toast.info(message);

    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="h-auto flex items-center justify-center bg-zinc-900 px-2 py-0">
      <div className="w-full max-w-md bg-zinc-100 text-white px-6 py-12 my-6 rounded-sm shadow-lg">
        <h2 className="text-2xl font-semibold text-zinc-800 text-center mb-6">
          Create Account
        </h2>

        <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
          <label className="text-sm pl-3 font-semibold text-zinc-800">
            Username
          </label>
          <input
            type="text"
            required
            name="username"
            value={values.username}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-zinc-100 text-black outline-none"
          />
        </div>
        <div className="mb-4  shadow-lg rounded-md border-b-3 border-indigo-900">
          <label className="text-sm pl-3 font-semibold text-zinc-800">
            Email
          </label>
          <input
            type="email"
            required
            name="email"
            value={values.email}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-zinc-100 text-black outline-none"
          />
        </div>

        <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
          <label className="text-sm pl-3 font-semibold text-zinc-800">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            value={values.password}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-zinc-100 text-black outline-none"
          />
        </div>

        <div className="mb-5 shadow-lg rounded-sm border-b-3 border-indigo-900">
          <label className="text-sm pl-3 font-semibold text-zinc-800">
            Address
          </label>
          <textarea
            rows={3}
            required
            name="address"
            value={values.address}
            onChange={change}
            className="w-full mt-1 px-3 py-1 bg-zinc-100 resize-none outline-none text-black"
          />
        </div>

        <button
          className="w-full bg-indigo-800 hover:bg-indigo-900 transition py-2 rounded-md font-semibold text-center cursor-pointer"
          onClick={submit}
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-zinc-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
