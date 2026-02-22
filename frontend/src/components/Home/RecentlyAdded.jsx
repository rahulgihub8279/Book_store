import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";

export default function RecentlyAdded() {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://book-heaven-9n21.onrender.com/api/v1/getrecentbooks",
        );
        setTimeout(() => {
          setLoading(false);
          setData(response.data.data);
        }, 700);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="mt-5 px-6 ">
        <h4 className="text-blue-500 text-3xl font-semibold">
          Recently added books
        </h4>
        {loading && <Loader></Loader>}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {Data &&
            Data.map((items, i) => (
              <div key={i}>
                <BookCard data={items}></BookCard>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
