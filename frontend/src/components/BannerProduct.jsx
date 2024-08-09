import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import img1 from "../assest/banner/img1_mobile.jpg";
import img2 from "../assest/banner/img2_mobile.webp";
import img3 from "../assest/banner/img3_mobile.jpg";
import img4 from "../assest/banner/img4_mobile.jpg";
import img5 from "../assest/banner/img5_mobile.png";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";

function BannerProduct() {
  const images = [image1, image2, image3, image4, image5];
  const imgs = [img1, img2, img3, img4, img5];

  const [currentImage, setCurrentImage] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="container mx-auto mt-2 rounded">
      <div className="sm:h-[20vh] md:h-[30vw] w-full relative sm:mx-2 md:mx-1">
        <div className="my-auto absolute left-0 top-[36%] bg-orange-500 text-white rounded-r-xl py-6 -z-10 md:z-10">
          <button className="text-3xl"
            onClick={()=>setCurrentImage(prev=>{
              if(prev===0) return 4;
              else return prev-1
            })}
          >
            <RiArrowLeftSLine />
          </button>
        </div>
        
        {/* Desktop or tablet version */}
        <div className=" hidden md:flex  w-full h-full overflow-hidden">  
          {images.map((image, ind) => {
            return (
              <div className="w-full h-full min-h-full min-w-full overflow-hidden transition-transform duration-500 ease-in-out" key={ind+"abc"} style={{transform: `translateX(-${currentImage*100}%)`}}>
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover object-center  "
                />
              </div>
            );
          })}
        </div>

        {/* Mobile version */}
        <div className="flex  w-[100vw] h-[25vh] overflow-hidden md:hidden">  
          {imgs.map((image, ind) => {
            return (
              <div className="w-full h-60% min-h-full min-w-full overflow-hidden transition-transform duration-500 ease-in-out" key={ind+"abc"} style={{transform: `translateX(-${currentImage*100}%)`}}>
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover object-center  "
                />
              </div>
            );
          })}
        </div>

        <div className="my-auto absolute right-0 top-[36%] bg-orange-500 text-white rounded-l-xl py-6 -z-10 md:z-10">
          <button className="text-3xl"
            onClick={()=>setCurrentImage(prev=>{
              if(prev===4) return 0;
              else return prev+1
            })}
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;
