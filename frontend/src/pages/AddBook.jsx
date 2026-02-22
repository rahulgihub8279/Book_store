import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("all fields are required !");
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/v1/addbook",
          data,
          { headers },
        );
        setLoading(false);
        toast.success(response.data.message);
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {loading && <Loader></Loader>}
      {!loading && (
        <div className="h-full items-center justify-center flex p-1 md:px-4">
          <form
            onSubmit={submit}
            className="w-full h-fit max-w-xl bg-zinc-300 px-6 py-3  rounded-md shadow-xl"
          >
            <h1 className="text-4xl font-bold mb-6 text-center text-indigo-900">
              Add New Book
            </h1>

            {""}
            <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
              <label className="text-sm font-semibold text-zinc-800 pl-3">
                Book url
              </label>
              <input
                type="text"
                required
                name="url"
                value={data.url}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-100  text-black outline-none rounded-sm"
              />
            </div>
            {""}
            {/* Title */}
            <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
              <label className="text-sm font-semibold text-zinc-800 pl-3">
                Title
              </label>
              <input
                type="text"
                required
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-100  text-black outline-none rounded-sm"
              />
            </div>

            {/* Author */}
            <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
              <label className="text-sm font-semibold text-zinc-800 pl-3">
                Author
              </label>
              <input
                type="text"
                required
                name="author"
                value={data.author}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-100  text-black outline-none rounded-sm"
              />
            </div>

            {/* Price */}
            <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
              <label className="text-sm font-semibold text-zinc-800 pl-3">
                Price
              </label>
              <input
                type="number"
                required
                name="price"
                value={data.price}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-100  text-black outline-none rounded-sm"
              />
            </div>

            {/* Language */}
            <div className="mb-4 shadow-lg rounded-md border-b-3 border-indigo-900">
              <label className="text-sm font-semibold text-zinc-800 pl-3">
                language
              </label>
              <input
                type="text"
                required
                name="language"
                value={data.language}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-100  text-black outline-none rounded-sm"
              />
            </div>

            {/* Description */}

            <div className="mb-5 shadow-lg rounded-sm border-b-3 border-indigo-900">
              <label className="text-sm pl-3 font-semibold text-zinc-800">
                Description
              </label>
              <textarea
                rows={4}
                required
                name="desc"
                value={data.desc}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-1 bg-zinc-100 resize-none outline-none text-black rounded-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-700 hover:bg-indigo-900 transition-all duration-200 font-semibold shadow-lg active:scale-95"
            >
              Add Book
            </button>
          </form>
        </div>
      )}
    </>
  );
}
