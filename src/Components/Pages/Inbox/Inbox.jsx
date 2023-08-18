import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { globalActions } from '../../Store/globalSlice';

import { useNavigate } from 'react-router-dom';
const Inbox = () => {
  const dispatch = useDispatch();
  const receivedMails = useSelector((state) => state.global.receivedMails);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllMails = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        let response = await axios.get('http://localhost:3010/email/get', { headers: { "Authorization": token } });
        let count = 0;
        response.data.data.forEach((item) => {
          if (item.opened == false) count++;
        })
        console.log(response.data.data);
        dispatch(globalActions.updateUnread(count))
        dispatch(globalActions.InboxFill(response.data.data));
      } catch (error) {
        console.log(error);
        toast.error('couldnt fetch mails')
      }
    }
    getAllMails()
  }, [])

  return (
    receivedMails && receivedMails.length > 0 ? (
      receivedMails.map((item) => {
        return <div key={item._id} onClick={(e) => {
          e.preventDefault();
          navigate(`/${item._id}`)
        }} className={` rounded-2xl w-[80%] mx-auto p-2 flex  border  my-2  cursor-pointer ${item.opened === true ? `bg-white` : `bg-gray-300`}`}>
          <div className='mr-4 flex justify-center items-center '>
            <img className=' min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]  md:max-h-[70px] md:max-w-[70px]  object-cover' src="https://api-private.atlassian.com/users/9cea692d0a59c5e100680165cbbeb496/avatar" alt="" />
          </div>
          <div className='flex flex-col overflow-hidden'>
            <span className='text-gray-800 font-bold'>{item.sender}</span>
            <span className='text-gray-800 font-medium'>{item.subject}</span>
            <span className='text-gray-800 truncate '>{item.body}</span>
          </div>
        </div>
      })
    ) : (<div className='text-6xl text-gray-800 font-bold text-center w-[50%] mx-auto animate-bounce mt-[30%] '>
      <p>No emails available</p>
    </div>))
}

export default Inbox