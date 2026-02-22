import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

export default function AllBooks() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://book-heaven-9n21.onrender.com/api/v1/getallbooks",
        );
        setTimeout(() => {
          setLoading(false);
          setData(response.data.data);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  //* Pagination logic
  const totalPages = Math.ceil(data.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = data.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="bg-zinc-900 p-4 min-h-screen">
      <h4 className="text-zinc-400 text-2xl font-semibold">All Books</h4>

      {loading && <Loader />}

      {/* Books Grid */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {currentBooks.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((e) => e - 1)}
            className="px-3 py-1 bg-zinc-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-700 text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((e) => e + 1)}
            className="px-3 py-1 bg-zinc-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
