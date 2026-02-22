import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Favourites from "./components/Profile/Favourites";
import OrderHistory from "./components/Profile/OrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import Addbook from "./pages/AddBook"
import UpdateBook from "./pages/UpdateBook";
import { Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails/BookDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role) {
      dispatch(authActions.login({ role }));
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/allBooks" element={<AllBooks></AllBooks>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/profile" element={<Profile></Profile>}>
          {role === "user" ? (
            <Route index element={<Favourites></Favourites>}></Route>
          ) : (
            <Route index element={<AllOrders></AllOrders>}></Route>
          )}
          {role==="admin" && <Route
            path="/profile/addbook"
            element={<Addbook></Addbook>}
          ></Route>}
          <Route
            path="/profile/orderHisory"
            element={<OrderHistory></OrderHistory>}
          ></Route>
          <Route
            path="/profile/settings"
            element={<Settings></Settings>}
          ></Route>
        </Route>
        <Route
          path="/bookdetails/:id"
          element={<BookDetails></BookDetails>}
        ></Route>
        <Route
          path="/updatebook/:id"
          element={<UpdateBook></UpdateBook>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
