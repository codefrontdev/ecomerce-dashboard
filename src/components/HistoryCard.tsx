import React from "react";
import Btn from "./Btn";
import { UserDevice } from "../types/users";
import { Laptop, Smartphone } from "lucide-react";

interface HistoryCardProps {
  history: UserDevice[];
  handleLogoutAllDevices: () => void;
  handleLogoutDevice: (deviceId: string) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  history,
  handleLogoutAllDevices,
  handleLogoutDevice,
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-white">
          Login History
        </h2>
        <Btn
          text="All Logout"
          className="bg-gray-50 border dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
          onClick={handleLogoutAllDevices} // تأكد من أنك تعرف ماذا يفعل هذا
        />
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {history?.length ? (
          history.map((device, i) => {
            const isMobile =
              device.deviceType?.toLowerCase().includes("mobile") ||
              device.deviceType?.toLowerCase().includes("phone");
            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold">
                  {isMobile ? <Smartphone size={18} /> : <Laptop size={18} />}
                  <div className="flex flex-col">
                    <span>{device.deviceType}</span>

                    <span className="text-gray-500 dark:text-gray-400 font-medium text-[11px]">
                      {new Date(device.loginAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Btn
                  text="Logout"
                  className="text-orange-500 flex items-center gap-2 font-medium text-[12px] px-4 py-2 rounded-md"
                  onClick={() => handleLogoutDevice(device.id)}
                />
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 mt-3">No login history available.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
