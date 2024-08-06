import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import loginImage from "../assest/signin.gif";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function AdminPannel() {
  const user = useSelector((state) => state.user?.user);

  //console.log(user);
  const [isAsideVisible, setAsideVisible] = useState(true);

  const toggleAside = () => {
    setAsideVisible(!isAsideVisible);
  };

  return (
    <div className="min-h-[130vh] bg-black flex relative">
      <button
        onClick={toggleAside}
        className="absolute top-4 left-5 z-50 p-2 text-white "
      >
        { isAsideVisible ? <FaArrowLeft /> : < FaArrowRight />}
      </button>
      <aside
        className={`bg-stone-900 text-white min-h-full w-full max-w-60 customShadow transition-transform duration-500 ${
          isAsideVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" my-[4vh] w-full h-52 flex justify-center items-center flex-col">
          <div className="relative flex justify-center">
            {user?.profilePic ? (
              <div className="relative rounded-full overflow-hidden  shadow-xl transition-all duration-300 w-[25vh] h-[25vh] hover:shadow-md hover:shadow-orange-500 mb-2">
                <img
                  src={user.profilePic}
                  className="absolute top-0 left-0 w-full shadow-xl transition-all duration-300 "
                  alt={user.name}
                />
              </div>
            ) : (
              <img src={loginImage} alt=" shadow-xl transition-all duration-300" />
            )}
          </div>
          <p className="capitalize text-2xl font-bold">{user?.name}</p>
          <p className="text-sm shadow-sm rounded-lg px-3 py-1 shadow-orange-500">
            {user?.role}
          </p>
        </div>

        {/* navigation */}
        <div>
          <nav className="grid gap-1 mx-4 ">
            <Link
              to={"/admin-pannel/all-users"}
              className="px-2 py-1 text-center hover:shadow-md hover:shadow-orange-500 rounded-md shadow-xl transition-all duration-300"
            >
              All Users
            </Link>
            <Link
              to={"/admin-pannel/products"}
              className="px-2 py-1 text-center hover:shadow-md hover:shadow-orange-500 rounded-md shadow-xl transition-shadow duration-300"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className={`transition-all duration-500 ${
          !isAsideVisible ? "w-full -ml-60" : "w-full"
        } h-full p-4 bg-black`} onClick={()=>setAsideVisible(false)}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPannel;
