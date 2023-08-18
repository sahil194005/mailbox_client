import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { globalActions } from '../../Store/globalSlice';
import { AiOutlineDelete } from 'react-icons/ai';
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
          if (item.opened === false) count++;
        })

        dispatch(globalActions.updateUnread(count))
        dispatch(globalActions.InboxFill(response.data.data));
      } catch (error) {
        console.log(error);
        toast.error('couldnt fetch mails')
      }
    }
    const interval = setInterval(() => {
      getAllMails();
    }, 3000)
    return () => {
      clearInterval(interval);
    }
   
  }, [])
  let id;
  const MailDeleteHandler = async (e) => {
    try {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.patch(`http://localhost:3010/email/isDelete/${id}`, { nothing: "here" }, { headers: { "Authorization": token } });
      dispatch(globalActions.deleteMail(id));

      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg)
    }
  }
  return (
    receivedMails && receivedMails.length > 0 ? (
      receivedMails.map((item) => {
        return <div key={item._id} className={` rounded-2xl md:w-[80%] mx-auto p-2 flex justify-between  border  my-2  cursor-pointer ${item.opened === true ? `bg-white` : `bg-gray-300`}`}>
          <div className='flex truncate overflow-hidden overflow-ellipsis ' onClick={(e) => {
            e.preventDefault();
            navigate(`/inboxMail/${item._id}`)
          }}>
            <div className='mr-4 flex justify-center items-center '>
              <img className=' min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]  md:max-h-[70px] md:max-w-[70px]  object-cover' src="https://api-private.atlassian.com/users/9cea692d0a59c5e100680165cbbeb496/avatar" alt="" />
            </div>
            <div className='flex flex-col  '>
              <span className='text-gray-800 font-bold'>{item.sender}</span>
              <span className='text-gray-800 font-medium'>{item.subject}</span>
              <span className='text-gray-800  '>{item.body}</span>
            </div>
          </div>
          <div className='text-4xl text-gray-500 p-2' onClick={(e) => {
            id = item._id;
            MailDeleteHandler(e);
          }}>
            <AiOutlineDelete />
          </div>
        </div>
      })
    ) : (<div className='text-6xl text-gray-800 font-bold text-center w-[50%] mx-auto animate-bounce mt-[30%] '>
      <p>No emails available</p>
    </div>))
}

export default Inbox