import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import loginImage from "../assest/signin.gif";

function AdminPannel() {
  const user = useSelector((state) => state.user?.user);

  //console.log(user);
  

  return (
    <div className="min-h-[130vh]  flex">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className=" my-[4vh] w-full h-52 flex justify-center items-center flex-col">
          <div className="relative flex justify-center">
            {
              user?.profilePic ? (
                <div className="relative rounded-full overflow-hidden  shadow-xl w-[25vh] h-[25vh]">
                  <img
                    src={user.profilePic}
                    className="absolute top-0 left-0 w-full"
                    alt={user.name}
                  />
                </div>
              ) : (
                <img 
                  src={loginImage}
                  alt="" 
                />
              )
            }
          </div>
          <p className="capitalize text-2xl font-bold">
            {user?.name}
          </p> 
          <p className="text-sm" >{user?.role}</p>
        </div>

        {/* navigation */}
        <div>
            <nav className="grid gap-1 mx-4 ">
              <Link to={'/admin-pannel/all-users'} className="px-2 py-1 text-center hover:bg-orange-100 active:bg-orange-300">All Users</Link>
              <Link to={'/admin-pannel/products'} className="px-2 py-1 text-center hover:bg-orange-100 active:bg-orange-300">Products</Link>
            </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPannel;
