/** @format */

import Card from "../../components/orders/Card";
import ClientDetails from "../../components/orders/ClientDetails";
import Section from "../../components/fields/Section";
import InputField from "../../components/fields/InputField";
import TextAreaField from "../../components/fields/TextAreaField";
import Btn from "../../components/Btn";
import { z } from "zod";
import { FieldError, Path, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";

const settingSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  website: z.string().min(1, { message: "Website is required" }),
  about: z.string().min(1, { message: "About is required" }),
  currentPassword: z.string().min(1, { message: "Password is required" }),
  newPassword: z.string().min(1, { message: "New password is required" }),
  repeatPassword: z.string().min(1, { message: "Repeat password is required" }),
});

type Setting = z.infer<typeof settingSchema>;
const SettingsPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Setting>({
    resolver: zodResolver(settingSchema), // استخدام Zod للتحقق من الصحة
  });

  const onSubmit: SubmitHandler<Setting> = (data) => {
    console.log("Setting created:", data);
  };

  const generalFields: Array<{
    name: Path<Setting>;
    label: string;
    type: string;
    placeholder: string;
    validation: { required: string };
  }> = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your First Name",
      validation: { required: "First Name is required" },
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your Last Name",
      validation: { required: "Last Name is required" },
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter Phone Number",
      validation: { required: "Phone Number is required" },
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      type: "email",
      validation: { required: "Email is required" },
    },
    {
      label: "City",
      placeholder: "Enter City",
      type: "text",
      name: "city",
      validation: { required: "City is required" },
    },
    {
      label: "Postal Code",
      placeholder: "Enter Postal Code",
      type: "text",
      name: "postalCode",
      validation: { required: "Postal Code is required" },
    },
    {
      label: "Country",
      placeholder: "Enter Country",
      type: "text",
      name: "country",
      validation: { required: "Country is required" },
    },
    {
      label: "Wbsite",
      placeholder: "sfdgf.com",
      type: "text",
      name: "website",
      validation: { required: "Website is required" },
    },
  ];

  const passwordFields: Array<{
    name: Path<Setting>;
    label: string;
    type: string;
    placeholder: string;
    validation: { required: string };
  }> = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter Current Password",
      type: "password",
      validation: { required: "Current Password is required" },
    },
    {
      label: "New Password",
      placeholder: "Enter New Password",
      type: "password",
      name: "newPassword",
      validation: { required: "Password is required" },
    },
    {
      name: "repeatPassword",
      label: "Repeat Password",
      type: "password",
      placeholder: "Repeat Password",
      validation: { required: "Repeat Password is required" },
    },
  ];

  return (
    <div className='flex gap-5'>
      <div className='w-1/3 flex flex-col gap-5'>
        <Card>
          <ClientDetails />
        </Card>
        <Card>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-white'>
              Login History
            </h2>
            <Btn
              text='All Logout'
              className='bg-gray-50 border dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md'
            />
          </div>

          <div className='flex flex-col gap-4 mt-5'>
            <div className='flex items-center justify-between'>
              <div className=''>
                <h3 className='text-gray-900 dark:text-gray-100 font-semibold'>
                  Web
                </h3>
                <span className='text-gray-500 dark:text-gray-400 font-medium text-[11px]'>
                  Apr 10, 2023 at 07:18AM
                </span>
              </div>
              <Btn
                text='Logout'
                className=' text-orange-500 flex items-center gap-2 font-medium text-[12px] px-4 py-2 rounded-md'
              />
            </div>
          </div>
        </Card>
      </div>
      <div className='flex-1 flex flex-col gap-5'>
        <Card>
          <div className='flex flex-col gap-4'>
            <Section title='Edit Profile'>
              <Form<Setting> onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {generalFields.map((field) => (
                      <InputField
                        key={field.name}
                        register={register}
                        {...field}
                        errors={
                          errors[field.name as Path<Setting>] as FieldError
                        }
                      />
                    ))}
                  </div>
                  <TextAreaField
                    label='About Me'
                    placeholder='Text'
                    name='about'
                    register={register}
                    errors={errors.about as FieldError}
                    rows={2}
                  />
                  <div className=' flex items-center justify-end'>
                    <Btn
                      text='Update Profile'
                      className='bg-orange-400 w-fit text-white gap-2 border border-gray-300 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md'
                    />
                  </div>
                </>
              </Form>
            </Section>
            <Section title='Change Password'>
              <Form<Setting> onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  {passwordFields.map((field) => (
                    <InputField
                      key={field.name}
                      register={register}
                      {...field}
                      errors={errors[field.name as Path<Setting>] as FieldError}
                    />
                  ))}
                  <div className=' flex items-center justify-end'>
                    <Btn
                      text='Update Profile'
                      className='bg-orange-400 w-fit text-white gap-2 border border-gray-300 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md'
                    />
                  </div>
                </div>
              </Form>
            </Section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
