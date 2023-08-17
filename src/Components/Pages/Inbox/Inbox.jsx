import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { globalActions } from '../../Store/globalSlice';
const Inbox = () => {
  const dispatch = useDispatch();
  const receivedMails = useSelector((state) => state.global.receivedMails);
  useEffect(() => {
    const getAllMails = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        let response = await axios.get('http://localhost:3010/email/get', { headers: { "Authorization": token } })
        console.log('get all mails api called');
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
        return <div key={item._id} className='flex  border  my-2 bg-gray-300'>
          <div className='mr-4 flex justify-center items-center '>
            <img className=' min-h-[40px] min-w-[40px] max-h-[70px] max-w-[70px]  object-cover' src="https://api-private.atlassian.com/users/9cea692d0a59c5e100680165cbbeb496/avatar" alt="" />
          </div>
          <div className='flex flex-col overflow-hidden'>
            <span className='text-gray-800 font-bold'>{item.sender}</span>
            <span className='text-gray-800 font-medium'>{item.subject}</span>
            <span className='text-gray-800 truncate '>{item.body}</span>
          </div>
        </div>
      })

    ) : (<p>No emails available</p>))
}

export default Inbox