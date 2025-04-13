/** @format */

import React, { ReactNode } from "react";
import Btn from "../Btn";

interface Action {
  label: string;
  onClick: () => void;
  icon: ReactNode;
  path: string | null
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions: Action[];
  id: string
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  actions,
  id,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='absolute flex-col -translate-x-28 translate-y-0  h-fit inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-white dark:bg-gray-500 rounded-lg shadow-lg p-4 min-w-[100px] max-w-fit'
      onClick={onClose}>
      <div className='absolute top-5 right-0 transform translate-x-full -translate-y-1/2 border-8 border-transparent border-l-white dark:border-l-gray-500'></div>

      <div className='space-y-2'>
        {actions.map((action, index) => (
          <Btn
            key={index}
            onClick={() => {
              action.onClick();
              onClose();
            }}
            path={action.path ? action.path.replace(":id", id.toString()) : ""}
            text={action.label}
            className='bg-gray-50 border w-full justify-center dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md'
          />
        ))}
      </div>
    </div>
  );
};

export default ActionModal;
