import React, { useContext, useState } from "react";
import loginImage from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import axios from "axios";
import { toast } from "react-toastify";
import context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { fetchUserDetails } = useContext(context);

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

  // console.log(data);

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resp = await axios.post('/api/signin', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(resp.data.success){
        toast.success("Logged In Successfull !!!")
        navigate('/home')
        fetchUserDetails();
      }
      if(resp.data.error){
        toast.error("Something went wrong !!!") 
      }

      /* 
      CORS ki problem se bachne ka sabse achcha tarika hai proxy
      Google per jao like proxy for react Vite and read documentation
      */


      // console.log( resp.data);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }

  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);


    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });

    setDp(imagePic)

  };


  return (
    <section id="login" className="my-4 ">
      <div className="mx-auto container px-4">
        <div className="max-w-md mx-auto rounded-md bg-stone-900 hover:bg-stone-950 text-white p-2 py-5 w-full">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <div className="rounded-full overflow-hidden">
              <img src={ dp || loginImage} alt="Login Icon" />
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
            className="w-[90%] mt-[3vh] mx-auto block"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="">Email : </label>
              <div className="bg-slate-100 p-2 rounded-lg">
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
              <div className="bg-slate-100 p-2 flex rounded-lg">
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
            <button className="bg-orange-500 hover:bg-orange-500 text-lg font-bold text-white w-full  my-5 px-4 py-2 rounded-md active:scale-95 transition-all max-w-[50%] mx-auto block">
              Login
            </button>
            <p className="block w-fit mx-auto">
              Already have an account?{" "}
              <Link to="/signin" className="hover:text-orange-500">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
