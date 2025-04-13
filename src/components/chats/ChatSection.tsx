/** @format */

// components/ChatSection.tsx
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import { UserMessage } from "../../pages/chat";

interface ChatSectionProps {
  user: UserMessage;

}

const ChatSection: React.FC<ChatSectionProps> = ({ user }) => {
  return (
    <div className='w-full'>
      <ChatHeader />
      <MessageList user={user} />
      
    </div>
  );
};

export default ChatSection;
