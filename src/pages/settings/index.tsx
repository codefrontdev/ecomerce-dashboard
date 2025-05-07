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
import HistoryCard from "../../components/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logOutFromDevice } from "../../features/usersSlice";
import { toast } from "react-toastify";
import { updateProfile } from "../../features/authSlice";
const settingSchema = z.object({
  firstName: z
    .string()

    .optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  website: z.string().optional(),
  about: z.string().optional(),

  // الحقول المتعلقة بكلمة السر تكون مطلوبة فقط إذا كان هناك تغيير
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  repeatPassword: z.string().optional(),

  // تحقق من تطابق كلمة السر فقط إذا كان هناك تغيير
  passwordsMatch: z
    .object({
      newPassword: z.string().optional(),
      repeatPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.newPassword || data.repeatPassword) {
          return data.newPassword === data.repeatPassword;
        }
        return true; // إذا لم يتم تغيير كلمة السر، يتم قبول الحقول الفارغة
      },
      {
        message: "Passwords must match",
        path: ["repeatPassword"],
      }
    )
    .optional()
    .refine(
      (data) => {
        if (data?.newPassword || data?.repeatPassword) {
          return !!data.newPassword === !!data.repeatPassword;
        }
        return true; // إذا لم يتم تغيير كلمة السر، يتم قبول الحقول الفارغة
      },
      {
        message: "Both passwords must be provided if one is entered",
      }
    ),
});



type Setting = z.infer<typeof settingSchema>;
const SettingsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Setting>({
    resolver: zodResolver(settingSchema), // استخدام Zod للتحقق من الصحة
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: user?.city || "",
      country: user?.country || "",
      postalCode: user?.postalCode || "",
      website: user?.website || "",
      about: user?.about || "",
    },
  });

  const onSubmit: SubmitHandler<Setting> = (data) => {
    const userId = user?.id;
    if (!userId) {
      toast.error("User ID is required");
      return;
    }

    const credentials = new FormData();

    // إرسال فقط الحقول غير الفارغة (وتجاهل حقول كلمات السر المؤقتة)
   Object.entries(data).forEach(([key, value]) => {
     if (
       value &&
       typeof value === "string" &&
       !["currentPassword", "repeatPassword", "newPassword"].includes(key)
     ) {
       credentials.append(key, value);
     }
   });
    // إذا كانت كلمة السر الجديدة موجودة، نرسلها تحت اسم موحد فقط
    if (data.newPassword) {
      credentials.append("password", data.newPassword);
    }

    const updateUserPayload = { credentials };
    dispatch(updateProfile(updateUserPayload)).then((result) => {
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload?.message || "", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
  };

  console.log(errors);
  const generalFields: Array<{
    name: Path<Setting>;
    label: string;
    type: string;
    placeholder: string;
  }> = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your First Name",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your Last Name",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter Phone Number",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      type: "email",
    },
    {
      label: "City",
      placeholder: "Enter City",
      type: "text",
      name: "city",
    },
    {
      label: "Postal Code",
      placeholder: "Enter Postal Code",
      type: "text",
      name: "postalCode",
    },
    {
      label: "Country",
      placeholder: "Enter Country",
      type: "text",
      name: "country",
    },
    {
      label: "Wbsite",
      placeholder: "sfdgf.com",
      type: "text",
      name: "website",
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
  const userDetails = {
    fullName: `${user?.firstName} ${user?.lastName}`,
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    status: user?.status ?? "",
    location: `${user?.city || ""} ${user?.country || ""} ${
      user?.postalCode || ""
    }`,
    role: user?.role ?? "",
    profilePicture: user?.profilePicture?.url ?? "",
  };

  console.log("user", userDetails, user);


  const handleLogoutDevice = (deviceId: string) => {
    console.log("logout device", deviceId);
    dispatch(logOutFromDevice(deviceId))
      .unwrap()
      .then(() => {
        toast.success("تم تسجيل الخروج من الجهاز بنجاح");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex gap-5">
      <div className="w-1/3 flex flex-col gap-5">
        <Card>
          <ClientDetails user={userDetails} />
        </Card>
        <Card>
          <HistoryCard
            handleLogoutAllDevices={() => {}}
            handleLogoutDevice={handleLogoutDevice}
            history={user?.deviceHistory || []}
          />
        </Card>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <Card>
          <div className="flex flex-col gap-4">
            <Section title="Edit Profile">
              <Form<Setting> onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {generalFields.map((field) => (
                      <InputField
                        key={field.name}
                        register={register}
                        {...field}
                        errors={errors[field.name as keyof typeof errors] as FieldError}
                      />
                    ))}
                  </div>
                  <TextAreaField
                    label="About Me"
                    placeholder="Text"
                    name="about"
                    register={register}
                    errors={errors.about as FieldError}
                    rows={2}
                  />
                  <div className=" flex items-center justify-end">
                    <Btn
                      type="submit"
                      text="Update Profile"
                      className="bg-orange-400 w-fit text-white gap-2 border border-gray-300 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
                    />
                  </div>
                </>
              </Form>
            </Section>
            <Section title="Change Password">
              <Form<Setting> onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {passwordFields.map((field) => (
                    <InputField
                      key={field.name}
                      register={register}
                      {...field}
                      errors={errors[field.name as keyof typeof errors] as FieldError}
                    />
                  ))}
                  <div className=" flex items-center justify-end">
                    <Btn
                      type="submit"
                      text="Update Profile"
                      className="bg-orange-400 w-fit text-white gap-2 border border-gray-300 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
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
