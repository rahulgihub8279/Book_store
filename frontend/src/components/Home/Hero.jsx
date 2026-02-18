import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="min-h-[70vh] flex flex-col md:flex-row items-center gap-2 px-2 md:px-5">
       
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-5xl sm:text-4xl lg:text-6xl font-semibold text-white leading-tight">
          Discover Your Next Great Read
        </h1>

        <p className="mt-4 text-base sm:text-xl text-zinc-400 max-w-xl">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>

        <div className="mt-6">
          <Link
            to="/allbooks"
            className=" 
              hidden 
              md:inline-block px-8 py-3
              text-zinc-400 text-lg sm:text-xl
              border border-zinc-500 rounded-full
              font-semibold
              hover:bg-zinc-600  
              transition-all duration-300
            "
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="w-full md:w-2xl flex items-center justify-center">
        <img
          src="/hero.png"
          alt="hero"
          className="md:w-full w-3/4"
        />
      </div>
    </div>
  );
}
