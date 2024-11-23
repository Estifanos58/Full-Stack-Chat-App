import { useAppStore } from '@/store'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ContactContainer from './component/contact-container';
import EmptyChatContainer from './component/empty-chat-container';
import ChatContainer from './component/chat-container';

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      navigate('/profile')
    }
  },[userInfo, navigate])
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactContainer/>
      <EmptyChatContainer/>
      <ChatContainer/>
    </div>
  )
}

export default Chat