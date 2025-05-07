/** @format */

import { FC, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdOutlinePhone, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Btn from "../../components/Btn";
import { AppDispatch, RootState } from "../../redux/store";
import Section from "../../components/fields/Section";
import { getUserById, logOutFromDevice } from "../../features/usersSlice";
import { Laptop, LogOut, Smartphone } from "lucide-react";
import { toast } from "react-toastify";

const UserDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.users.user);
    useEffect(() => {
      dispatch(getUserById(id || ""));
    }, [ dispatch]);

    if (!user) return <div>...جاري التحميل</div>;

  const handleLogoutDevice = (deviceId: string) => {
    dispatch(logOutFromDevice(deviceId)).unwrap().then(() => {
      toast.success("تم تسجيل الخروج من الجهاز بنجاح");
    }).catch((error) => {
      toast.error(error.message);
    });
  };

  return (
    <div className="flex flex-col gap-6 p-5 bg-white dark:bg-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <img
            src={user.profilePicture?.url || "/default-avatar.png"}
            alt={user.firstName + " " + user.lastName}
            className="w-24 h-24 object-cover rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Role: <span className="capitalize">{user.role}</span>
            </p>
            <p
              className={`text-xs mt-1 font-medium inline-block px-3 py-1 rounded-full ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </p>
          </div>
        </div>
        <Btn
          icon={<FiEdit />}
          path={`/customers/${user.id}/edit`}
          text="Edit"
          className="bg-gray-100 dark:bg-gray-700 text-teal-700 flex items-center gap-2 border border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <BiSolidCommentDetail size={24} className="text-blue-600" />,
            label: "Comments",
            value: user.comments?.length || 0,
          },
          {
            icon: <FaRegUserCircle size={24} className="text-purple-600" />,
            label: "Orders",
            value: user.orders?.length || 0,
          },
          {
            icon: <MdOutlinePhone size={24} className="text-green-600" />,
            label: "Phone",
            value: user.phone || "N/A",
          },
          {
            icon: <MdEmail size={24} className="text-pink-600" />,
            label: "Email",
            value: user.email,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="text-md font-semibold dark:text-white">
              {stat.value}
            </span>
            <small className="text-gray-500 dark:text-gray-400 uppercase text-xs">
              {stat.label}
            </small>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <Section title="Activity">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Device History */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-lg dark:text-white">
              Device History
            </h4>
            {user.deviceHistory?.length ? (
              <div className="space-y-4">
                {user.deviceHistory.map((device, i: number) => {
                  const isMobile =
                    device.deviceType?.toLowerCase().includes("mobile") ||
                    device.deviceType?.toLowerCase().includes("phone");

                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold">
                          {isMobile ? (
                            <Smartphone size={18} />
                          ) : (
                            <Laptop size={18} />
                          )}
                          <span>{device.deviceType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(device.loginAt).toLocaleString()}
                          </span>
                          <Btn
                            className="p-1 flex items-center px-2 gap-3 hover:bg-red-100 dark:hover:bg-red-900 text-red-500 rounded-full"
                            onClick={() => handleLogoutDevice(device.id)}
                            text="Log out"
                            icon={<LogOut size={16} />}
                          />
                          
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <span className="font-medium">OS:</span> {device.os}{" "}
                        <br />
                        <span className="font-medium">Browser:</span>{" "}
                        {device.browser} <br />
                        <span className="font-medium">IP:</span>{" "}
                        {device.ipAddress} <br />
                        <span className="font-medium">Location:</span>{" "}
                        {device.location || "Unknown"}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No device history available.</p>
            )}
          </div>

          {/* Reviews */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-lg dark:text-white">
              Reviews
            </h4>
            {user.reviews?.length ? (
              <div className="space-y-4">
                {user.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 shadow-sm"
                  >
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {review.content?.slice(0, 120) || "No content"}...
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews submitted.</p>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default UserDetails;
