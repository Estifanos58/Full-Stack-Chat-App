import React, { useEffect, useRef } from "react";  
import moment from "moment";  
import { useAppStore } from "@/store";  

const MessageContainer = () => {  
  const { selectedChatType, selectedChatData, selectedChatMessages } = useAppStore();  
  const scrollRef = useRef();  

  useEffect(() => {  
    if (scrollRef.current) {  
      scrollRef.current.scrollIntoView({ behavior: "smooth" });  
    }  
  }, [selectedChatMessages]);  

  const renderMessages = () => {  
    let lastDate = null;  
    return selectedChatMessages.map((message, index) => {  
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");  
      const showDate = messageDate !== lastDate;  
      lastDate = messageDate;  

      return (  
        <div key={index}>  
          {showDate && (  
            <div className="text-center text-gray-500 my-2 font-semibold">  
              {moment(message.timestamp).format("LL")}  
            </div>  
          )}  
          {selectedChatType === "contact" && renderDMMessages(message)}  
        </div>  
      );  
    });  
  };  

  const renderDMMessages = (message) => (  
    <div className={`flex ${message.sender === selectedChatData._id ? "justify-start" : "justify-end"} my-1`}>  
      <div  
        className={`${  
          message.sender !== selectedChatData._id  
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"  
            : "bg-[#2a2b33]/5 text-white/80 border-white/20"  
        } border inline-block p-3 rounded-lg max-w-[70%] break-words shadow-md transition-transform duration-200 transform hover:scale-105`}  
      >  
        {message.messageType === "text" && message.content}  
      </div>  
      <div className="text-xs text-gray-600 ml-2 self-end">  
        {moment(message.timestamp).format("LT")}  
      </div>  
    </div>  
  );  

  return (  
    <div className="flex flex-col overflow-y-auto scrollbar-hidden p-4 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">  
      {renderMessages()}  
      <div ref={scrollRef} />  
    </div>  
  );  
};  

export default MessageContainer;
