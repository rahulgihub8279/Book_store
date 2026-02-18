import { Link } from "react-router-dom";

export default function BookCard({ data }) {
  return (
    <Link to={`/bookdetails/${data._id}`} className="h-full block">
      <div
        className="
        h-full
        bg-transparent
        p-4
        flex flex-col
        gap-3
        transition-all duration-300
        hover:scale-[1.02]
        rounded-sm
      "
      >
        {/* Image */}
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <img
            src={data?.url}
            alt={data?.title}
            onError={(e) => (e.target.src = "/logo.png")}
            className="w-full h-full object-cover md:ml-10 ml-18"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-around">
          <div>
            <h2 className="text-zinc-200 text-lg font-semibold line-clamp-2">
              {data?.title}
            </h2>
            <p className="text-zinc-400 text-sm line-clamp-1">
              by {data?.author} (author)
            </p>
          </div>

          <p className="text-zinc-100 font-bold ">₹ {data?.price}</p>
        </div>
      </div>
    </Link>
  );
}
