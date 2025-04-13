/** @format */

import { FC } from "react";
import { UserMessage } from "../../pages/chat";
import ProfileHeader from "./ProfileHeader";

interface RightSectionProps {
  isRightCollapsed: boolean;
  userMessage: UserMessage;
}
const RightSection: FC<RightSectionProps> = ({
  isRightCollapsed,
  userMessage,
}) => {
  return (
    <div className='w-full flex flex-col items-center gap-10 border-t border-gray-300'>
      <ProfileHeader
        isCollapsed={isRightCollapsed}
        name={userMessage.name}
        online={userMessage.online}
      />
    </div>
  );
};

export default RightSection;
