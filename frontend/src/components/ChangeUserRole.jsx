import React, { useState } from 'react'
import Role from '../common/role'
import { GrFormClose } from "react-icons/gr";
import axios from 'axios';
import { toast } from 'react-toastify';

function ChangeUserRole({name, email, role, onClose}) {

  const [userRole, setUserRole] = useState(role)

  function handleChange(e){
    // console.log(e.target.value);
    setUserRole(e.target.value)
  }

  async function updateUserRole() {
    try {
      const resp = await axios.post('/api/update-user',{role: userRole,email,name},{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (resp.data.success) {
        toast.success("Role updated successfully");
      } else {
        toast.error("Failed to update role");
      }

      console.log("role update",resp.data);
    }catch(error){
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role");
    }
    
  }

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-60'>
      <div className='bg-black rounded-lg text-white shadow-md p-4 w-full max-w-sm'>
        
        <div className='flex items-center justify-between pb-4'>
          <h1 className='text-lg font-medium'>Change User Role</h1>
          
          <button className='text-3xl font-bold hover:text-orange-500 active:scale-90' onClick={onClose}>
            < GrFormClose />
          </button>
        </div>
        
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className='flex items-center justify-between my-1'>
          <p>ROLE: </p>
          <select className=' py-1 px-4 bg-transparent rounded-md' value={userRole} onChange={handleChange}>
            {
              Object.values(Role).map(item=>(
                <option className='bg-black hover:bg-orange-500' key={item} value={item}>{item}</option>
              ))
            }
          </select>
        </div>
        <button className='w-fit mx-auto block active:scale-95 px-4 py-1 my-2 rounded-lg bg-orange-500' onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole
