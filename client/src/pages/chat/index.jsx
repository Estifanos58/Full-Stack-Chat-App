import { useAppStore } from '@/store'
import React,{useEffect, useNavigate} from 'react'

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      navigate('/profile')
    }
  },[userInfo, navigate])
  return (
    <div>Chat</div>
  )
}

export default Chat