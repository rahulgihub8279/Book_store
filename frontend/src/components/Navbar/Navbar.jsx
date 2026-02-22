import { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/allbooks",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (!isLoggedIn) {
    links.splice(2, 3);
  }
  if (isLoggedIn && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn && role === "admin") {
    links.splice(3, 1);
  }
  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="relative flex items-center justify-between bg-zinc-950 text-white px-8 py-4 z-50">
        <Link to="/" className="flex items-center">
          <img className="w-10 h-10 me-3" src="./logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold">Book Heaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex gap-3 items-center">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center" key={i}>
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 rounded-lg border border-blue-500 text-blue-500
hover:bg-blue-500/20 hover:text-white transition-all duration-200"
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 border border-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-250"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-3 py-1 border border-blue-500 bg-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-250"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="block md:hidden text-white text-3xl hover:text-zinc-500 transition-all duration-200"
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <TfiMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-900 h-full absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${mobileNav} text-white text-4xl hover:text-blue-500 transition-all duration-300 cursor-pointer mt-8`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className={`${mobileNav} px-11 text-white text-2xl py-2 border border-blue-500 rounded-md hover:bg-zinc-800 transition-all duration-250 mt-8`}
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`${mobileNav} px-8 py-2 text-white text-2xl  border border-blue-500 bg-blue-500 rounded-md hover:bg-zinc-800  transition-all duration-250 mt-8`}
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}
