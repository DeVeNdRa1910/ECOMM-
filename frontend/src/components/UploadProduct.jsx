import React, { memo, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { productCategory } from "../helper/productCategory";
import uploadImage from "../helper/uploadImage";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
import FullScreenImage from "./FullScreenImage";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function UploadProduct({ onClose }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(false);

  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const [view, setView] = useState(null);
  const [file, setFile] = useState(null);

  //when You upload Image through file
  const handleFileChange = (e) => {
    const tempFile = e.target.files[0];
    setFile(e.target.files[0]);

    if (tempFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setView(reader.result);
        // console.log(reader.result);
      };
      reader.readAsDataURL(tempFile);
    }
  };

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async () => {
    if (file) {
      try {
        setLoading(true)
        const UploadImageCloudinary = await uploadImage(file); // Await the uploadImage function
        setData((prev) => {
          return {
            ...prev,
            productImage: [...prev.productImage, UploadImageCloudinary.url],
          };
        });
        if (UploadImageCloudinary.url) {
          toast.success("Product Image Uploaded Successfully");
        }
        console.log("Image uploaded successfully:", UploadImageCloudinary.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }setLoading(false)
    setFile(null);
    setView(null);
  };

  async function deleteProductImageHandler(index) {
    console.log("image index", index);

    const newProductImages = [...data.productImage];
    newProductImages.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImages],
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    console.log(data);
    
    
    try {
      const resp = await axios.post('/api/upload-product', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(resp);
  
      if (resp.data?.success) {
        toast.success(resp.data.message);
        onClose();
      } else if (resp.data?.error) {
        toast.error(resp.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again later.');
    }
  }

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black text-white border-2 shadow-xl border-gray-500 p-6 rounded-md w-[80vw] h-[80vh] overflow-y-auto scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Products Here</h2>
          <button
            className="text-3xl transition-all hover:text-orange-500 active:scale-90"
            onClick={onClose}
          >
            <GrFormClose />
          </button>
        </div>

        <div className="flex items-start gap-6">
          {/* Image upload and URL input */}
          <div className="w-1/3 flex flex-col items-center">
            {view && (
              <img
                src={view}
                alt="Selected"
                className="w-full h-auto border border-gray-300 rounded-md"
              />
            )}
            <div className="w-full mb-4">
              <label htmlFor="fileInput" className="block mb-2 text-white">
                Upload Image:
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                className="border rounded-md w-full py-2 px-3 bg-gray-700 text-white"
              />
            </div>

            <div className="flex items-center justify-center w-full my-3">
              {loading ? <LoadingSpinner h={2} w={2} /> :<button
                onClick={handleUploadProduct}
                className="mt-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-1 px-4 rounded-md"
              >
                Upload Image
              </button>}
            </div>
          </div>

          {/* Form fields */}
          <form
            className="flex-1 grid gap-4 scrollbar"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1 text-white">
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                name="productName"
                value={data.productName}
                onChange={handleOnChange}
                className="w-full bg-transparent border-b border-gray-300 py-2 text-white text-md px-4 focus:outline-none focus:border-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="brandName" className="block mb-1 text-white">
                Brand Name:
              </label>
              <input
                type="text"
                id="brandName"
                placeholder="Enter brand name"
                name="brandName"
                value={data.brandName}
                onChange={handleOnChange}
                className="w-full bg-transparent border-b border-gray-300 py-2 text-white text-md px-4 focus:outline-none focus:border-white"
              />
            </div>

            <div className="mb-4 flex items-center gap-4">
              <label htmlFor="category" className="text-white">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={data.category}
                onChange={handleOnChange}
                className="py-2 px-4 bg-black text-white border rounded-md"
              >
                {productCategory.map((item) => (
                  <option value={item.value} key={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 text-white">
                Description:
              </label>
              <textarea
              rows={4}
                id="description"
                placeholder="Product Description"
                name="description"
                value={data.description}
                onChange={handleOnChange}
                className="w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white text-md resize-y overflow-y-auto placeholder-white placeholder-opacity-70 "
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="price" className="block mb-1 text-white">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Price"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-white text-md px-4 focus:outline-none focus:border-white"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="sellingPrice" className="block mb-1 text-white">
                  Selling Price:
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  placeholder="Selling Price"
                  name="sellingPrice"
                  value={data.sellingPrice}
                  onChange={handleOnChange}
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-white text-md px-4 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <button
              onSubmit={submitHandler}
              className="mt-2 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-1 px-4 rounded-md"
            >
              Upload Product
            </button>
          </form>
        </div>
        <div className="my-[2vh] flex items-center justify-center">
          {data?.productImage[0] ? (
            <div className="relative w-full max-w-4xl overflow-x-auto">
              <div className="relative w-full max-w-full overflow-x-auto scrollbar">
                <div className="flex space-x-4 mx-[2vw]">
                  {data?.productImage.map((image, index) => (
                    <div key={index} className="relative group flex-shrink-0">
                      <img
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-40 h-60 hover:scale-125 transition-all object-cover rounded-lg my-5"
                        onClick={()=>{
                          setFullScreenImage(image)
                          setOpenFullScreen(false)
                        }}
                      />
                      <div
                        className="absolute bottom-6 right-3 p-1 text-white bg-red-600 rounded-full hidden group-hover:block transition-all cursor-pointer"
                        onClick={deleteProductImageHandler}
                      >
                        <RiDeleteBin6Fill />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Upload new Product</p>
          )}
        </div>
      </div>

      {/* Full screen view of image */}
      {
        openFullScreen && (
          <FullScreenImage onClose={()=>{setOpenFullScreen(false)} } imgUrl={fullScreenImage}/>
        )
      }

    </div>
  );
}

export default memo(UploadProduct);
