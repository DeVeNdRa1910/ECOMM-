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
  //console.log(user);

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
      //console.log(resp.data);
      toast.success("Logout Successfully !!!");
      dispatch(setUserDetails(null));
    }
    if (resp.data.error) {
      console.log(resp.data);
      toast.error("Logout Failed !!!");
    }

    navigate("/");
  }

  return (
    <nav className="bg-orange-500 h-[8vh] w-full text-white fixed top-0 left-0 z-10 opacity-85 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center h-full px-2">
        <div className="flex items-center justify-start w-[30vw]">
          <Logo />
        </div>

        <form className="w-[40vw] flex items-center h-[6vh]">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-l-full w-full h-full pl-4 py-1 text-black"
          />
          <button className="h-full pr-4 rounded-r-full bg-white text-orange-600">
            <FaSearch />
          </button>
        </form>

        <div className="flex items-center justify-end gap-4 sm:text-lg md:text-xl lg:text-2xl h-full w-[30vw]">
          {user?._id ? (
            user.profilePic ? (
              <div 
                className="relative rounded-full overflow-hidden h-[7vh] w-[7vh] cursor-pointer"
                onClick={()=>navigate('/admin-pannel')}
              >
                <img
                  src={user.profilePic}
                  className="absolute top-0 left-0 w-full"
                  alt={user.name}
                />
              </div>
            ) : (
              <div 
                className="text-4xl cursor-pointer"
                onClick={()=>navigate('/admin-pannel')}
              >
                <IoIosContact />
              </div>
            )
          ) : (
            <div className="text-4xl">
              <IoIosContact />
            </div>
          )}
          <button className="bg-black  px-4 flex items-center justify-between gap-2 rounded-xl">
            <FaCartShopping />:<p className="flex">{0}</p>
          </button>

          <button onClick={toggleMenu} className="">
            {isOpen ? <IoClose /> : <ImMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className={`fixed top-[8vh] right-0 sm:w-[50vw] md:w-[30vw] min-h-screen bg-orange-500 p-4 z-40`}
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
                  <div className="flex flex-col justify-center gap-3 w-full">
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border border-1 border-white"
                      onClick={() => {
                        navigate("/update-profile");
                        toggleMenu();
                      }}
                    >
                      Update Profile
                    </button>
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90 border border-1 border-white"
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
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90"
                      onClick={() => {
                        navigate("/login");
                        toggleMenu();
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="block w-full text-xl font-bold bg-orange-600 hover:bg-black px-4 py-2 rounded-xl active:scale-90"
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
