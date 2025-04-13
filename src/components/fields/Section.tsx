/** @format */

interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <>
      <h2 className='text-2xl font-semibold dark:text-white'>{title}</h2>
      <div className='w-full p-4 border border-gray-300 rounded-xl flex flex-col gap-4'>
        {children}
      </div>
    </>
  );
};

export default Section;
