import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { useSelector } from 'react-redux';


function Allusers() {

  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  });

  // const user = useSelector(state => state.user.user)
  // console.log(user);
  

  async function fetchUsersData(){
      const resp = await axios.get('/api/allusers', {
        withCredentials: true
      })

      // console.log(resp);

      if(resp.data.success){
        // console.log(resp.data);
        
        // toast.success("All users fetched successfully")
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
    setUpdateUserDetails(user);
  }

  return (
    <div className=''>
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
        <tbody className='border border-1 gap-2 scrollbar'>
          {
            allUsers.map((user, i) => (
              <tr key={user?._id}  className='border border-1 my-1'>
                <td className=''>{i+1}</td>
                <td >
                  {user.profilePic ? (<img className='w-[9vw] h-auto max-h-[18vw] rounded-lg my-1 block mx-auto' src={user?.profilePic} alt={user?.name} />) : (<p>Image Not available</p>)}
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
                  {/* {openUpdateRole && selectedUser && selectedUser._id === user._id && (
                  <ChangeUserRole 
                    key={user._id}
                    name={user.name} 
                    email={user.email} 
                    role={user.role} 
                    userId={user._id}
                    callFun={fetchUsersData}
                    onClose={()=>{setOpenUpdateRole(prev=>!prev)}} 
                  />)} */}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

        {
          openUpdateRole && (
            <ChangeUserRole 
                    name={updateUserDetails.name} 
                    email={updateUserDetails.email} 
                    role={updateUserDetails.role} 
                    userId={updateUserDetails._id}
                    callFunc={fetchUsersData}
                    onClose={()=>{setOpenUpdateRole(prev=>!prev)}} 
                  />
          )
        }

    </div>
  )
}

export default Allusers
