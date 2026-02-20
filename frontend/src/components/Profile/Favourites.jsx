import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

export default function Favourites() {
  const [loading, setLoading] = useState(false);
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/getallfavouritesbooks",
        { headers },
      );
      setTimeout(() => {
        setFavouriteBooks(response.data.data);
        setLoading(false);
      }, 200);
    };
    fetch();
  }, []);

  const removeFromUI = (bookid) => {
    setFavouriteBooks((prev) => prev.filter((book) => book._id !== bookid));
  };
  return (
    <>
      {loading && <Loader />}

      {!loading && !favouriteBooks.length && (
        <div className="text-5xl font-semibold text-zinc-600 flex items-center justify-center w-full h-[90%]">
          No Favourite Books 📚
        </div>
      )}
      {!loading && favouriteBooks.length > 0 && (
        <>
        <h1 className="text-4xl text-zinc-400 ms-5 font-semibold">Favourite Books</h1>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favouriteBooks.map((item, i) => (
              <BookCard
                data={item}
                key={i}
                favourite={true}
                onRemove={removeFromUI}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
