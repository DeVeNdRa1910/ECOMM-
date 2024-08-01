import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import { IoIosContact } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  async function logoutHandler() {
    const resp = await axios.get("/api/logout", {
      withCredentials: true,
    });
    if (resp.data.success) {
      navigate("/");
      console.log(resp.data);
      toast.success("Logout Successfully !!!");
      dispatch(setUserDetails(null));
    }
    if (resp.data.error) {
      console.log(resp.data);
      toast.error("Logout Failed !!!");
    }
  }

  return (
    <nav className="bg-orange-500 h-[10vh] w-full text-white fixed top-0 left-0 z-10 opacity-85 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center h-full px-2">
        <div className="flex items-center justify-start w-[30vw]">
          <Logo />
        </div>

        <form className="w-[40vw] flex items-center h-[7vh]">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-l-full w-full h-full pl-4 py-1 text-black"
          />
          <button className="h-full pr-4 rounded-r-full bg-white text-orange-600">
            <FaSearch />
          </button>
        </form>

        <div className="flex items-center justify-end gap-4 sm:text-lg md:text-xl lg:text-2xl w-[30vw]">
          <button className="text-3xl" onClick={()=>{navigate('/update-profile')}}>
            {user?._id ? (
              user.profilePic ? (
                <div className="relative rounded-full overflow-hidden sm:h-[3vh] sm:w-[3vh] md:h-[4vw] md:w-[4vw]">
                  <img
                    src={user.profilePic}
                    className="absolute top-0 left-0 w-full"
                    alt={user.name}
                  />
                </div>
              ) : (
                <IoIosContact />
              )
            ) : (
              <IoIosContact />
            )}
          </button>
          <button className="bg-black  px-4 flex items-center justify-between gap-2 py-0.5 rounded-xl">
            <FaCartShopping />:<p className="flex">{0}</p>
          </button>

          <button onClick={toggleMenu} className="">
            {isOpen ? <IoClose /> : <ImMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-[10vh] right-0 w-[50vw] min-h-screen bg-orange-500 p-4 z-10 ">
          <div className="mt-8 relative">
            <Link to="#" className="block py-2 hover:underline">
              Home
            </Link>
            <Link to="#" className="block py-2 hover:underline">
              Shop
            </Link>
            <Link to="#" className="block py-2 hover:underline">
              Contact
            </Link>
            <div className="flex items-center justify-center w-full absolute top-96 left-0 ">
              {user?._id ? (
                <button
                  className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu()
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
