/** @format */

import { z } from "zod";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import Form from "../../components/Form";
import Section from "../../components/fields/Section";
import InputField from "../../components/fields/InputField";
import TextAreaField from "../../components/fields/TextAreaField";
import TagsInput from "../../components/fields/TagsInput";
import SelectField from "../../components/fields/SelectField";
import Btn from "../../components/Btn";
import { createCategory } from "../../features/categoriesSlice";

// Schema
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["active", "inactive"]),
});

type Category = z.infer<typeof categorySchema>;

const CreateCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      tags: [],
      status: "active",
    },
  });

  const onSubmit: SubmitHandler<Category> = (data) => {
    dispatch(createCategory(data))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Category created successfully");
        reset();
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to create category");
      });
  };

  return (
    <Form<Category> onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pr-6">
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Category Info">
            <InputField
              label="Category Name"
              placeholder="Enter Category Name"
              register={register}
              name="name"
              errors={errors.name as FieldError}
            />
            <TextAreaField
              label="Description"
              placeholder="Enter Category Description"
              rows={3}
              register={register}
              name="description"
              errors={errors.description as FieldError}
            />
          </Section>
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
          <Section title="Category Options">
            <TagsInput
              error={errors.tags?.message}
              setValue={setValue}
              name="tags"
              label="Tags"
              id="category-tags"
              placeholder="Add tags and press Enter"
            />
            <SelectField
              label="Status"
              name="status"
              id="status"
              register={register}
              errors={errors.status as FieldError}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              defaultValue="active"
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

export default CreateCategory;
