import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async () => {
    try {
      if (!values.username || !values.password) {
        toast.warn("all fields are required !");
        return;
      }
      const payload = {
        username: String(values.username).trim(),
        password: String(values.password).trim(),
      };
      const response = await axios.post(
        "https://book-heaven-9n21.onrender.com/api/v1/signin",
        payload,
      );
      dispatch(authActions.login({role:response.data.role})); 
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast("welcome back")
    } catch (err) {
      console.log(err.response.data.message);
      toast.warn(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 py-3">
      <div className="w-full max-w-md bg-zinc-100 text-white px-6 py-4 rounded-sm shadow-lg">
        <h2 className="text-2xl text-zinc-800 font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
          <label className="text-sm font-semibold text-zinc-800 pl-3">
            Username
          </label>
          <input
            type="text"
            placeholder=""
            required
            name="username"
            value={values.username}
            onChange={change}
            className="w-full px-3 py-2 bg-zinc-100  text-black outline-none"
          />
        </div>

        <div className="mb-8 shadow-lg rounded-md border-b-3 border-indigo-900">
          <label className="text-sm font-semibold text-zinc-800 pl-3">
            Password
          </label>
          <input
            type="password"
            placeholder=""
            required
            name="password"
            value={values.password}
            onChange={change}
            className="w-full px-3 py-2 bg-zinc-100  text-black outline-none"
          />
        </div>

        <button
          className="w-full bg-indigo-800 hover:bg-indigo-900 transition py-2 rounded-md font-semibold text-center cursor-pointer"
          onClick={submit}
        >
          Login
        </button>

        <p className="text-center text-sm text-zinc-800 mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
