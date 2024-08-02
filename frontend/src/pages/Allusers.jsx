import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


function Allusers() {

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  async function fetchUsersData(){
    const resp = await axios.get('/api/allusers', {
      withCredentials: true
    })

    // console.log(resp);
    

    if(resp.data.success){
      // console.log(resp.data);
      
      toast.success("All users fetched successfully")
      setAllUsers(resp.data.users)
    }

    if(resp.data.error){
      toast.error("Something went wrong")
    }
    // console.log(resp.data.users);
  }

  useEffect(()=>{
    fetchUsersData()
  }, [])

  // console.log(allUsers);
  
  function editHandler(user){
    setOpenUpdateRole(prev=>!prev)
    setSelectedUser(user);
  }

  return (
    <div>
      <table className='w-full userTable'>
        <thead className='bg-black text-white py-2'>
          <tr>
            <th>Sr.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='border border-1 gap-2'>
          {
            allUsers.map((user, i) => (
              <tr key={user?._id}  className='border border-1 my-1'>
                <td className='pl-4'>{i+1}</td>
                <td >
                  {user.profilePic ? (<img className='w-[9vw] h-auto max-h-[18vw] rounded-lg mx-[2vw] my-1' src={user?.profilePic} alt={user?.name} />) : (<p>Image Not available</p>)}
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format('ll')}</td>
                <td>
                  <button
                    className='bg-green-500 hover:bg-green-700 text-white text-xl font-bold active:scale-90 px-8 py-2 rounded-md'
                    onClick={()=>{editHandler(user)}}
                  >
                    <MdModeEdit />
                  </button>
                  {openUpdateRole && selectedUser && selectedUser._id === user._id && (
                  <ChangeUserRole 
                    key={user._id}
                    name={user.name} 
                    email={user.email} 
                    role={user.role} 
                    onClose={()=>{setOpenUpdateRole(prev=>!prev)}} 
                  />)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Allusers
