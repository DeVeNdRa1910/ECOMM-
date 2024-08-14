import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import { IoIosContact } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useEffect } from "react";
import { add, clearCart } from "../store/cartSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [netQuantity, setNetQuantity] = useState(0);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // DB se cart products fetch karke cartSlice me store kar lo
  useEffect(() => {
    async function fetchCartProducts() {
      dispatch(clearCart());

      const resp = await axios.get("/api/get-cart-products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your-token-here",
        },
      });

      const cartProductsDB = resp.data.data;

      cartProductsDB?.forEach(item => {
        const cartObj = {
          id: item.productId,
          productName: item.productName,
          image: item.productImage[0],
          quantity: item.quantity,
          price: item.sellingPrice,
        };

        dispatch(add(cartObj));
      });
    }

    fetchCartProducts();
  }, [dispatch]);

  // Calculate netQuantity directly from the cart state
  useEffect(() => {
    let quantity = cart?.reduce((acc, item) => acc + item.quantity, 0);
    setNetQuantity(quantity);
  }, [cart]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  async function logoutHandler() {
    const resp = await axios.get("/api/logout", {
      withCredentials: true,
    });
    if (resp.data.success) {
      navigate("/login");
      toast.success("Logout Successfully !!!");
      dispatch(setUserDetails(null));
    } else {
      toast.error("Logout Failed !!!");
    }

    navigate("/login");
  }

  function profileHandler() {
    if (!user) {
      navigate("/login");
    } else if (user.role === "ADMIN") {
      navigate("/admin-pannel");
    } else {
      navigate("/update-profile");
    }
  }


  //apply Debouncing
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery)
  
  function handleSearch(e){

    let {value} = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }

  return (
    <nav className="bg-orange-500 h-[8vh] w-full text-white fixed top-0 left-0 z-20 opacity-85 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center h-full px-2">
        <div className="flex items-center justify-start w-[30vw]">
          <Logo />
        </div>

        <div className="w-[50vw]">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none border-b border-b-white hidden md:block w-[30vw] mx-auto px-4 py-1 text-white my-auto placeholder:text-slate-200  "
            onChange={handleSearch}
            value={search}
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:text-lg md:text-xl lg:text-2xl h-full w-[30vw]">
          <button onClick={profileHandler}>
            {user?._id ? (
              user.profilePic ? (
                <div className="relative rounded-full overflow-hidden h-[7vh] w-[7vh] cursor-pointer">
                  <img
                    src={user.profilePic}
                    className="absolute top-0 left-0 w-full"
                    alt={user.name}
                  />
                </div>
              ) : (
                <div className="text-4xl cursor-pointer">
                  <IoIosContact />
                </div>
              )
            ) : (
              <div className="text-4xl">
                <IoIosContact />
              </div>
            )}
          </button>
          <button
            onClick={() => {
              if (netQuantity === 0) {
                toast.error("Your cart is empty");
                return;
              }
              navigate("/cart");
            }}
            className="bg-black  px-4 flex items-center justify-between gap-2 rounded-xl"
          >
            <FaCartShopping />:<p className="flex">{netQuantity}</p>
          </button>

          <button onClick={toggleMenu} className="">
            {isOpen ? <IoClose /> : <ImMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className={`fixed top-[8vh] right-0 sm:w-[50vw] md:w-[30vw] min-h-screen bg-black p-4 z-40`}
          >
            <div className="mt-8 relative w-full">
              <Link
                to={"/home"}
                onClick={toggleMenu}
                className="block py-2 hover:underline font-semibold"
              >
                Home
              </Link>
              <Link
                to="#"
                onClick={toggleMenu}
                className="block py-2 hover:underline font-semibold"
              >
                Shop
              </Link>
              <Link
                to="#"
                onClick={toggleMenu}
                className="block py-2 hover:underline font-semibold"
              >
                Contact
              </Link>
              {user && (
                <Link
                  to={"/admin-pannel"}
                  onClick={toggleMenu}
                  className="block py-2 hover:underline font-semibold"
                >
                  Admin Pannel
                </Link>
              )}

              <div className="flex items-center justify-center w-full absolute left-0 mt-[5vh]">
                {user?._id ? (
                  <div className="flex flex-col justify-center gap-3 w-full container">
                    <button
                      className="btn block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border border-1  border-black hover:border-white"
                      onClick={() => {
                        navigate("/update-profile");
                        toggleMenu();
                      }}
                    >
                      Update Profile
                    </button>
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border border-1  border-black hover:border-white"
                      onClick={() => {
                        logoutHandler();
                        toggleMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center gap-3 w-full">
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border-black hover:border-white"
                      onClick={() => {
                        navigate("/login");
                        toggleMenu();
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border-black hover:border-white"
                      onClick={() => {
                        navigate("/signin");
                        toggleMenu();
                      }}
                    >
                      Signup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Header;
