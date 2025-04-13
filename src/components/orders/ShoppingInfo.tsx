/** @format */

const ShoppingInfo = () => {
  const info = {
    fullName: "John Doe",
    address: "123 Main Street, New York, USA",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
  };

  return (
    <div className='bg-white dark:bg-gray-700'>
      {/* العنوان */}
      <h2 className='text-lg font-semibold dark:text-white mb-1'>
        Shopping Information
      </h2>

      <div className='space-y-1'>
        {Object.entries(info).map(([key, value]) => (
          <div key={key} className='grid grid-cols-2'>
            <span className='text-gray-500 dark:text-gray-300 font-medium text-[12px] uppercase'>
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <small className='text-gray-900 dark:text-white line-clamp-1 font-medium'>
              {value}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingInfo;
