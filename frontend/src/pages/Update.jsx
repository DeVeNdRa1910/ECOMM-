import React, { useState } from "react";
import loginImage from "../assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Update() {
  const [dp, setDp] = useState(loginImage);
  const [data, setData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });


  const navigate = useNavigate()

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/api/update-profile', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });

      if(response.data.success){
        navigate('/home')
        toast.success("Profile Updated successfully")
      }
      if(!response.data.success){
        toast.error("Profile updation failed")
      }
      // console.log( response.data);
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
    <section id="signin" className="my-4 ">
      <ToastContainer/>
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
              <div className="bg-slate-100 p-2 rounded-lg">
                <input
                  type="name"
                  placeholder="Enter your new name"
                  onChange={handleOnChange}
                  name="name"
                  value={data.name}
                  className="text-black w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="">Email : </label>
              <div className="bg-slate-100 p-2 rounded-lg ">
                <input
                  type="email"
                  placeholder="Enter your new email"
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                  className="text-black w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-500 text-lg font-bold text-white w-full  my-5 px-4 py-2 rounded-md active:scale-95 transition-all max-w-[50%] mx-auto block">
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Update);
