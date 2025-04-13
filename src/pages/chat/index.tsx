/** @format */

import { useState } from "react";
import Card from "../../components/orders/Card";
import Btn from "../../components/Btn";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Plus,
  Send,
} from "lucide-react";
import Avatar from "../../assets/avatar.png";
import InputField from "../../components/fields/InputField";
import LeftSection from "../../components/chats/LeftSection";
import RightSection from "../../components/chats/RightSection";
import ChatSection from "../../components/chats/ChatSection";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import Form from "../../components/Form";

export interface MessageProps {
  id: number;
  sender: string;
  text: string;
  date: string;
}
export interface UserMessage {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  messages: MessageProps[];
  date: string;
  online: boolean;
}

const users = [
  {
    id: 1,
    name: "John Doe",
    avatar: Avatar,
    lastMessage: "See you soon!",
    messages: [
      {
        id: 1,
        sender: "John Doe",
        text: "Hello, how are you?",
        date: "12.03.2023 - 10:00 AM",
      },
      {
        id: 2,
        sender: "You",
        text: "I'm good, thanks! What about you?",
        date: "12.03.2023 - 10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        text: "I'm doing well too! Wanna catch up later?",
        date: "12.03.2023 - 10:05 AM",
      },
      {
        id: 4,
        sender: "You",
        text: "Sure! Let's meet at 5 PM.",
        date: "12.03.2023 - 10:10 AM",
      },
      {
        id: 5,
        sender: "You",
        text: "Sure! Let's meet at 5 PM.",
        date: "12.03.2023 - 10:10 AM",
      },
      {
        id: 6,
        sender: "John Doe",
        text: "Great! See you soon!",
        date: "12.03.2023 - 10:15 AM",
      },
    ],
    date: "12.03.2023 - 10:15 AM",
    online: true,
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: Avatar,
    lastMessage: "Don't forget our meeting!",
    messages: [
      {
        id: 1,
        sender: "Alice Smith",
        text: "Hey, did you check the report?",
        date: "12.03.2023 - 09:00 AM",
      },
      {
        id: 2,
        sender: "You",
        text: "Yes! I sent my feedback.",
        date: "12.03.2023 - 09:10 AM",
      },
      {
        id: 3,
        sender: "Alice Smith",
        text: "Awesome! Don't forget our meeting at 3 PM.",
        date: "12.03.2023 - 09:15 AM",
      },
      {
        id: 4,
        sender: "Alice Smith",
        text: "Awesome! Don't forget our meeting at 3 PM.",
        date: "12.03.2023 - 09:15 AM",
      },
    ],
    date: "12.03.2023 - 09:15 AM",
    online: false,
  },
  {
    id: 3,
    name: "David Brown",
    avatar: Avatar,
    lastMessage: "See you at the gym!",
    messages: [
      {
        id: 1,
        sender: "David Brown",
        text: "Hey! Are we still on for gym tonight?",
        date: "11.03.2023 - 08:00 PM",
      },
      {
        id: 2,
        sender: "You",
        text: "Yeah, I'll be there at 7 PM!",
        date: "11.03.2023 - 08:05 PM",
      },
      {
        id: 3,
        sender: "David Brown",
        text: "Great! See you then!",
        date: "11.03.2023 - 08:10 PM",
      },
    ],
    date: "11.03.2023 - 08:10 PM",
    online: true,
  },
];

const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type Message = z.infer<typeof messageSchema>;

const ChatPage = () => {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserMessage>(users[0]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Message>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: Message) => {
    console.log(data);
    reset();
  };

  return (
    <div
      className='grid grid-cols-12  gap-4'
      style={{ height: "82vh", minHeight: "-webkit-fill-available" }}>
      {/* Chats */}
      <Card
        className={`relative flex flex-col overflow-y-scroll h-[calc(100vh - 100px)] transition-all ${
          isLeftCollapsed ? "col-span-1" : "col-span-3"
        } overflow-hidden`}>
        <Btn
          className='bg-transparent w-fit text-teal-600 border border-gray-300 font-medium text-sm px-3 py-2 rounded-md'
          icon={isLeftCollapsed ? <ArrowBigRight /> : <ArrowBigLeft />}
          onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
        />

        <LeftSection
          selectedUser={selectedUser}
          onClick={(user) => setSelectedUser(user)}
          isLeftCollapsed={isLeftCollapsed}
          userMessage={users}
        />
      </Card>

      {/* Messages */}
      <Card
        className={`transition-all relative overflow-y-scroll h-[calc(100vh - 100px)]  !p-0 ${
          isLeftCollapsed && isRightCollapsed
            ? "col-span-10"
            : isLeftCollapsed || isRightCollapsed
            ? "col-span-8"
            : "col-span-6"
        }`}>
        <ChatSection user={selectedUser || users[0]} />
        <div className='sticky bottom-0 left-0 bg-white dark:bg-gray-700'>
          <Form<Message> onSubmit={onSubmit} handleSubmit={handleSubmit}>
            <div className='flex items-center justify-between gap-2 w-full shadow-[0_6px_6px_-3px_rgba(0,0,0,0.3)] dark:shadow-[0_6px_6px_-3px_rgba(255,255,255,0.1)] p-4'>
              <div className='flex-1 relative'>
                <InputField
                  register={register}
                  placeholder='Type your message here...'
                  name='message'
                  errors={errors.message || ({} as FieldError)}
                  btn={
                    <div className='absolute right-2 top-0.5 flex gap-2'>
                      <Btn
                        className='text-teal-600 border border-gray-300 dark:border-gray-600 font-medium text-sm p-2 rounded-xl'
                        icon={<Plus size={20} />}
                      />
                      <Btn
                        className='text-teal-600 border border-gray-300 dark:border-gray-600 font-medium text-sm p-2 rounded-xl'
                        icon={<Send size={20} />}
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </Form>
        </div>
      </Card>

      {/* Shared Files */}
      <Card
        className={`relative flex flex-col transition-all  overflow-y-scroll h-[calc(100vh - 100px)]  ${
          isRightCollapsed ? "col-span-1 col-start-12" : "col-span-3"
        } overflow-hidden`}>
        <Btn
          className='bg-transparent w-fit text-teal-600 border border-gray-300  font-medium text-sm px-5 py-2.5 rounded-md'
          icon={!isRightCollapsed ? <ArrowBigRight /> : <ArrowBigLeft />}
          onClick={() => setIsRightCollapsed(!isRightCollapsed)}
        />
        <RightSection
          isRightCollapsed={isRightCollapsed}
          userMessage={selectedUser}
        />
      </Card>
    </div>
  );
};

export default ChatPage;
