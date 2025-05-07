import { FC } from "react";
import { TrackingRes } from "../../types/tracking";

interface Props {
  tracking: TrackingRes;
}
const TrackOrder: FC<Props> = ({ tracking }) => {
  return (
    <div>
      {/* Track Order Content */}
      <h2 className="text-2xl font-semibold dark:text-white">Track Order</h2>
      <p className="text-gray-500 dark:text-gray-300 text-xs uppercase font-medium">
        Tracking id: <span>{tracking?.trackingNumber.slice(0, 16)}</span>
      </p>
      {tracking.steps &&
        tracking.steps.map((item, index) => {
          const datetime = new Date(`${item.date} ${item.time}`);
          return (
            <div
              key={index}
              className="border-b border-gray-500 dark:border-gray-600 gap-2 px-4 sm: py-2"
            >
              <h3 className="text-md font-bold dark:text-white">
                {item.status}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
              <p className="text-xs text-gray-400">
                {datetime.toLocaleDateString()} -{" "}
                {datetime.toLocaleTimeString()}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default TrackOrder;
