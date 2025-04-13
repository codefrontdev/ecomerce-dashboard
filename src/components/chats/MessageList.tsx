/** @format */

// components/MessageList.tsx
import React from "react";
import { MessageProps, UserMessage } from "../../pages/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  user: UserMessage;
}

const MessageList: React.FC<MessageListProps> = ({ user }) => {

  return (
    <div className='w-full h-[calc(100vh-100px)] p-4'>
      {user.messages.map((message: MessageProps, index: number) => {
        const [currentDate] = message.date.split(" - ");
        const previousDate =
          index > 0 ? user.messages[index - 1].date.split(" - ")[0] : null;
        const previousTime =
          index > 0 ? user.messages[index - 1].date.split(" - ")[1] : null;
        const isSameSender =
          index > 0 && user.messages[index - 1].sender === message.sender;
        const isNewDay = index === 0 || previousDate !== currentDate;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isSameSender={isSameSender}
            isNewDay={isNewDay}
            previousTime={previousTime}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default MessageList;
