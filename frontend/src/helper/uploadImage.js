// const url = `https://api.cloudinary.com/v1_1/:cloud_name/:object/:action`
/* 
action : upload, download...
cloud_name : dubjd0yfz...
object : image, video...

file - The file to upload. Can be the actual data (byte array buffer), the Data URI     (Base64 encoded), a remote FTP, HTTP or HTTPS URL of an existing file, or a private storage bucket (S3 or Google Storage) URL of a whitelisted bucket. See File source options for more details.
upload_preset - The name of an unsigned upload preset that you defined for unsigned uploading.
*/

// for providing preset go cloudinary -> my Profile -> add preset


import axios from "axios";
// const url = `https://api.cloudinary.com/v1_1/dubjd0yfz/image/upload`;
const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

async function uploadImage(image){
  const formData = new FormData();
  formData.append("file",image)
  formData.append("upload_preset", "dearcart_Products")
  try {
    const resp = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;  // Error ko handle karne ke liye dobara throw kar rahe hain
  }
}

export default uploadImage