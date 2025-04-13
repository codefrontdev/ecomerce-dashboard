/** @format */

// components/MessageBubble.tsx
import React from "react";
import Avatar from "../../assets/avatar.png";
import { UserMessage } from "../../pages/chat"; // تأكد من تعريف النوع UserMessage في ملف منفصل

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
}

interface MessageBubbleProps {
  message: Message;
  isSameSender: boolean;
  isNewDay: boolean;
  previousTime: string | null;
  user: UserMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isSameSender,
  isNewDay,
  previousTime,
  user,
}) => {
  const [currentDate, currentTime] = message.date.split(" - ");

  return (
    <div className='mb-3'>
      {isNewDay && (
        <div className='text-center text-gray-500 text-xs my-2'>
          {currentDate}
        </div>
      )}
      <div
        className={`flex items-center gap-3 ${
          message.sender === "You" ? "flex-row-reverse" : "flex-row"
        }`}>
        <img
          loading='lazy'
          className={`${
            isSameSender ? "mt-1" : "mt-4"
          } p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 transition-all w-10 h-10`}
          src={Avatar}
          alt='Avatar'
        />
        <div>
          {previousTime && previousTime !== currentTime && (
            <div
              className={`${
                message.sender === "You" ? "text-right" : ""
              } font-medium text-gray-400 text-xs mt-1`}>
              <span>{message.sender === "You" ? "You" : user.name}, </span>
              {currentTime}
            </div>
          )}
          <div
            className={`p-3 max-w-xs rounded-lg shadow-md ${
              message.sender === "You"
                ? "mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                : "mt-4 bg-teal-200 dark:bg-teal-700 text-teal-900 dark:text-white"
            } ${isSameSender ? "mt-1" : "mt-4"}`}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
