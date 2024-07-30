import React, { useState } from "react";
import loginImage from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import axios from "axios";
import SummaryApi from "../common";

function Signin() {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const [dp, setDp] = useState(loginImage);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(data);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(SummaryApi.signUp.url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log( response.data);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }

    

    //OR
    
/*     const resp = await fetch(SummaryApi.signUp.url,{
      method: SummaryApi.signUp.method,
      headers:{
        "content-type": "application/json"
      },
      body: json.stringify(resp)
    })

    const newData = await resp.json()

    console.log(newData); */
    
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    setData((prev) => {
      return {
        ...prev,
        profilePic: file,
      };
    });

    const image = await imageToBase64(file);

    setDp(image);

    console.log("file", dp);
  };

  return (
    <section id="signin" className="my-4 ">
      <div className="mx-auto container px-4">
        <div className="max-w-md mx-auto rounded-md bg-stone-900 hover:bg-stone-950 text-white p-2 py-5 w-full">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <div className="rounded-full overflow-hidden">
              <img src={dp || loginImage} alt="Login Icon" />
            </div>
            <form action="">
              <label>
                <div className="cursor-pointer absolute bottom-0 w-full h-full"></div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-[90%] mt-[3vh] mx-auto block"
          >
            <div className="grid">
              <label htmlFor="">Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="name"
                  placeholder="Enter Your Name"
                  onChange={handleOnChange}
                  name="name"
                  value={data.name}
                  required
                  className="text-black w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                  required
                  className="text-black w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Your Secret Password"
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                  required
                  className="text-black w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="text-2xl text-black cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="">Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create Your Secret Password"
                  className="text-black w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-500 text-lg font-bold text-white w-full  my-5 px-4 py-2 rounded-md active:scale-95 transition-all max-w-[50%] mx-auto block">
              Signin
            </button>
            <p className="block w-fit mx-auto">
              Already have an account?{" "}
              <Link to="/login" className="hover:text-orange-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Signin);
