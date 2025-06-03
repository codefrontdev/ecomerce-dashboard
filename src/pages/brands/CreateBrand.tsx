/** @format */

import { lazy } from "react";
import { z } from "zod";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { createBrand } from "../../features/brandsSlice"; 
import Form from "../../components/Form";
const Section = lazy(() => import("../../components/fields/Section"));
const InputField = lazy(
  () =>
    import("../../components/fields/InputField") as Promise<{
      default: React.ComponentType<any>;
    }>
);
const Btn = lazy(() => import("../../components/Btn"));
const FileUpload = lazy(
  () =>
    import("../../components/fields/FileUpload") as Promise<{
      default: React.ComponentType<any>;
    }>
);

// Define the maximum file size (8MB in bytes)
const MAX_FILE_SIZE = 8 * 1024 * 1024;

// Define accepted image MIME types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

// Schema
const brandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z
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

type Brand = z.infer<typeof brandSchema>;

const CreateBrand = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Brand>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logo: undefined,
    },
  });

  const onSubmit: SubmitHandler<Brand> = (data) => {
    dispatch(createBrand(data))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Brand created successfully");
        reset();
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to create brand");
      });
  };

  return (
    <Form<Brand> onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pr-6">
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Brand Info">
            <InputField
              label="Brand Name"
              placeholder="Enter Brand Name"
              register={register}
              name="name"
              errors={errors.name as FieldError}
            />
          </Section>
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Brand Logo">
            <FileUpload
              id="brand-logo"
              placeholder="Drop files here or click to upload"
              accept="image/*"
              multiple={false}
              name="logo"
              setValue={setValue}
              errors={errors.logo as FieldError}
              register={register}
            />
          </Section>
          <div className="flex items-center justify-end gap-3">
            <Btn
              className="bg-transparent border border-gray-300 text-white font-medium text-sm px-6 py-2.5 rounded-md"
              text="Cancel"
              type="button"
            />
            <Btn
              type="submit"
              className="bg-orange-400 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
              text="Submit"
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateBrand;
