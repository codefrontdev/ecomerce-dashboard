/** @format */

import Section from "../../components/fields/Section";
import InputField from "../../components/fields/InputField";
import Btn from "../../components/Btn";
import { z } from "zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";
import { Role, Status } from "../../types/users";
import SelectField from "../../components/fields/SelectField";
import FileUpload from "../../components/fields/FileUpload";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/usersSlice";
import { toast } from "react-toastify";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;

// Schema للتحقق من البيانات باستخدام Zod
const customerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum([Role.ADMIN, Role.CUSTOMER]),
  status: z.enum([Status.ACTIVE, Status.INACTIVE]),
  profilePictureUrl: z
    .any()
    .optional()
    .refine(
      (files) => {
        if (files?.length === 1) {
          const file = files[0];
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }
        return true;
      },
      { message: "Invalid file. Choose either JPEG or PNG image" }
    )
    .refine((files) => {
      if (files?.length === 1) {
        const file = files[0];
        return file.size <= MAX_FILE_SIZE;
      }
      return true;
    }, "Max file size allowed is 8MB."),
});

type Customer = z.infer<typeof customerSchema>;

const CreateCustomers = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<Customer> = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof Customer]);
    });
    dispatch(createUser(formData)).unwrap().then((result) => {
      if(result?.meta?.requestStatus && result.meta.requestStatus === "rejected") {
        toast.error(result.error.message);
        return;
      }
      if (result?.meta?.requestStatus && result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        return;
      }

      if (result?.meta?.requestStatus && result.meta.requestStatus === "pending") {
        toast.info("Creating customer...");
        return;
      }
      console.log(result);

      toast.success("Customer created successfully");
    }).catch((error) => {
      toast.error(error.message);
    });
    reset()
  };

  return (
    <Form<Customer> onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Customer Information">
            {/* الحقول الأساسية */}
            <InputField
              label="first Name"
              placeholder="Enter First Name"
              name="firstName"
              register={register}
              errors={errors.firstName as FieldError}
              type="text"
            />
            <InputField
              label="Last Name"
              placeholder="Enter Last Name"
              name="lastName"
              register={register}
              errors={errors.lastName as FieldError}
              type="text"
            />
            <InputField
              label="Email"
              placeholder="Enter Email"
              name="email"
              register={register}
              errors={errors.email as FieldError}
              type="email"
            />
            <InputField
              label="Password"
              placeholder="Enter Password"
              name="password"
              register={register}
              errors={errors.password as FieldError}
              type="password"
            />
            <InputField
              label="Phone"
              placeholder="Enter Phone Number"
              name="phone"
              register={register}
              errors={errors.phone as FieldError}
              type="text"
            />
            <InputField
              label="Address"
              placeholder="Enter Address"
              name="address"
              register={register}
              errors={errors.address as FieldError}
              type="text"
            />

          </Section>
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Customer Details">
            <div className="h-72">
              <FileUpload
                name="profilePictureUrl"
                placeholder="Upload Profile Picture"
                id="profilePictureUrl"
                accept="image/*"
                multiple={false}
                setValue={setValue}
                register={register}
                errors={errors.profilePictureUrl as FieldError}
              />
            </div>
            <SelectField
              label="Role"
              id="role"
              options={[
                { value: Role.ADMIN, label: "Admin" },
                { value: Role.CUSTOMER, label: "Customer" },
              ]}
              name="role"
              register={register}
              errors={errors.role as FieldError}
            />
            <SelectField
              label="Status"
              name="status"
              options={[
                { value: Status.ACTIVE, label: "Active" },
                { value: Status.INACTIVE, label: "Inactive" },
              ]}
              id="status"
              register={register}
              errors={errors.status as FieldError}
            />
          </Section>
          <div className="flex items-center justify-end gap-5 mt-5">
            <Btn
              text="Cancel"
              type="button"
              onClick={() => {
                reset();
              }}
              className="bg-gray-400 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
            />
            <Btn
              text="Create Customer"
              type="submit"
              className="bg-orange-400 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateCustomers;
