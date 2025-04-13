/** @format */

import { z } from "zod";
import Btn from "../../components/Btn";
import DateInput from "../../components/fields/DateInput";
import FileUpload from "../../components/fields/FileUpload";
import InputField from "../../components/fields/InputField";
import Section from "../../components/fields/Section";
import SelectField from "../../components/fields/SelectField";
import TagsInput from "../../components/fields/TagsInput";
import TextAreaField from "../../components/fields/TextAreaField";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createProduct } from "../../features/productSlice";
import { toast } from "react-toastify";
// Define the maximum file size (8MB in bytes)
const MAX_FILE_SIZE = 8 * 1024 * 1024;

// Define accepted image MIME types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "Tags is required"),
  shortDescription: z.string().min(1, "Short Description is required"),
  status: z.string().min(1, "Status is required"),
  visibility: z.string().min(1, "Visibility is required"),

  publishDate: z.date().min(new Date(), "Publish Date must be in the future"),
  manufacturerName: z.string().min(1, "Manufacturer Name is required"),
  manufacturerBrand: z.string().min(1, "Manufacturer Brand is required"),
  stock: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1, "Price must be greater than 0")
  ),
  discount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1, "Discount must be greater than 0")
  ),
  orders: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1, "Orders must be greater than 0")
  ),
  image: z
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
  images: z
    .any()
    .optional()
    .refine(
      (files) => {
        if (files.length === 0) return true;
        return files.every((file: File) => {
          return ACCEPTED_IMAGE_TYPES.includes(file?.type);
        });
      },
      {
        message: "Invalid file. Choose either JPEG or PNG image",
      }
    )
    .refine(
      (files) => {
        if (files.length === 0) return true;
        return files.every((file: File) => {
          return file?.size <= MAX_FILE_SIZE;
        });
      },
      {
        message: "Max file size allowed is 8MB.",
      }
    ),
  colors: z
    .array(z.string())
    .optional()
    .refine((arr) => (arr ?? []).length > 0, "At least one color is required"),
  sizes: z
    .array(z.string())
    .optional()
    .refine((arr) => (arr ?? []).length > 0, "At least one size is required"),
  attributes: z
    .array(z.string())
    .optional()
    .refine(
      (arr) => (arr ?? []).length > 0,
      "At least one attribute is required"
    ),
  attributesValues: z
    .array(z.string())
    .optional()
    .refine(
      (arr) => (arr ?? []).length > 0,
      "At least one attribute value is required"
    ),
  brand: z.string().min(1, "Brand is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
});

type Product = z.infer<typeof productSchema>;
const CreateProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      publishDate: new Date(),
      image: [],
      images: [],
      tags: [],
      colors: [],
      sizes: [],
      attributes: [],
      attributesValues: [],
    },
  });
  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log("Product created:", data);

    const formData = new FormData();

    // الصور
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    if (data.images && data.images.length > 0) {
      data.images.forEach((file: File) => formData.append("images", file));
    }

    // النصوص
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("shortDescription", data.shortDescription);
    formData.append("status", data.status);
    formData.append("visibility", data.visibility);
    formData.append("manufacturerName", data.manufacturerName);
    formData.append("manufacturerBrand", data.manufacturerBrand);
    formData.append("publishDate", new Date(data.publishDate).toISOString());

    // الأرقام
    formData.append("stock", data.stock.toString());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("orders", data.orders.toString());

    // المصفوفات
    
    data.tags.forEach((tag) => formData.append("tags", tag));
    data.colors?.forEach((color) => formData.append("colors", color));
    data.sizes?.forEach((size) => formData.append("sizes", size));
    data.attributes?.forEach((attr) => formData.append("attributes", attr));
    data.attributesValues?.forEach((val) =>
      formData.append("attributesValues", val)
    );

    console.log(formData);
    dispatch(createProduct(formData))
      .unwrap()
      .then((response) => {
        console.log("Product created successfully:", response);
        toast.success(response?.message || "Product created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        reset({
          publishDate: new Date(),
          image: [],
          images: [],
          tags: [],
          colors: [],
          sizes: [],
          attributes: [],
          attributesValues: [],
        });
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        toast.error(error?.message || "Failed to create product", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  
  return (
    <Form<Product> onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div className='flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5'>
          <Section title='Description'>
            <InputField
              label='Product Name'
              placeholder='Enter Product Name'
              register={register}
              name='name'
              errors={errors.name as FieldError}
            />
            <TextAreaField
              label='Product Description'
              placeholder='Enter Product Description'
              rows={3}
              register={register}
              name='description'
              errors={errors.description as FieldError}
            />
          </Section>

          <Section title='Product Categories'>
            <SelectField
              register={register}
              errors={errors.category as FieldError}
              name='category'
              label='Product Category'
              id='category'
              defaultValue='electronics'
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "fashion", label: "Fashion" },
                { value: "home", label: "Home" },
              ]}
            />
            <SelectField
              register={register}
              errors={errors.subCategory as FieldError}
              name='subCategory'
              label='SubCategory'
              id='subCategory'
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "fashion", label: "Fashion" },
                { value: "home", label: "Home" },
              ]}
            />

            <SelectField
              register={register}
              errors={errors.brand as FieldError}
              name='brand'
              label='Product Brand'
              id='brand'
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "fashion", label: "Fashion" },
                { value: "home", label: "Home" },
              ]}
            />

            <TagsInput
              error={errors.tags?.message}
              setValue={setValue}
              name='tags'
              label='Product Tags'
              id='product-tags'
              placeholder='Add a tag and press Enter'
            />
            <TextAreaField
              errors={errors.shortDescription as FieldError}
              register={register}
              name='shortDescription'
              label='Product Short Description'
              placeholder='Add short description for Product'
              rows={3}
            />
          </Section>
          <Section title='Publish'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <SelectField
                errors={errors.status as FieldError}
                register={register}
                name='status'
                label='status'
                id='status'
                defaultValue='available'
                options={[
                  { value: "available", label: "Available" },
                  { value: "disabled", label: "Disabled" },
                ]}
              />
              <SelectField
                errors={errors.visibility as FieldError}
                register={register}
                name='visibility'
                label='visibility'
                id='visibility'
                defaultValue='Public'
                options={[
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                  { value: "hidden", label: "Hidden" },
                ]}
              />
            </div>
            <DateInput
              errors={errors.publishDate as FieldError}
              setValue={setValue}
              name='publishDate'
              label='Publish Date'
              id='publish-date'
              placeholder='Enter Date & Time'
            />
          </Section>
        </div>
        <div className='flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 rounded-lg p-5'>
          <Section title='General Info'>
            <InputField
              errors={errors.manufacturerName as FieldError}
              label='manufacturer Name'
              placeholder='Enter Manufacturer Name'
              register={register}
              name='manufacturerName'
            />
            <InputField
              errors={errors.manufacturerBrand as FieldError}
              label='manufacturer brand'
              placeholder='Enter manufacturer brand'
              register={register}
              name='manufacturerBrand'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-5'>
              <InputField
                type='number'
                errors={errors.stock as FieldError}
                label='Stocks'
                placeholder='Stocks'
                register={register}
                name='stock'
              />
              <InputField
                errors={errors.price as FieldError}
                label='Price, $'
                placeholder='Price'
                register={register}
                type='number'
                name='price'
              />
              <InputField
                errors={errors.discount as FieldError}
                label='discount, %'
                type='number'
                placeholder='Discount'
                register={register}
                name='discount'
              />
              <InputField
                errors={errors.orders as FieldError}
                label='orders'
                type='number'
                placeholder='Orders'
                register={register}
                name='orders'
              />

              <TagsInput
                error={errors.colors?.message}
                setValue={setValue}
                name='colors'
                label='Product Colors'
                id='product-tags'
                placeholder='Enter Colors (comma separated)'
              />
              <TagsInput
                error={errors.sizes?.message}
                setValue={setValue}
                name='sizes'
                label='Sizes'
                id='product-tags'
                placeholder='Enter Sizes (comma separated)'
              />
              <TagsInput
                error={errors.attributes?.message}
                setValue={setValue}
                name='attributes'
                label='Product Attributes'
                id='product-tags'
                placeholder='Enter Attributes (comma separated)'
              />

              <TagsInput
                error={errors.attributesValues?.message}
                setValue={setValue}
                name='attributesValues'
                label='Product Attribute Values'
                id='product-tags'
                placeholder='Enter Attribute Values (comma separated)'
              />
            </div>
          </Section>

          <Section title='Product Gallery'>
            <div className='h-72'>
              <FileUpload
                setValue={setValue}
                id='product-image'
                placeholder='Drop files here or click to upload'
                accept='image/*'
                multiple={false}
                name='image'
                errors={errors.image as FieldError}
                register={register}
              />
            </div>
            <div className=''>
              <FileUpload
                setValue={setValue}
                id='product-images'
                accept='image/*'
                placeholder='Drop files here or click to upload'
                multiple={true}
                name='images'
                errors={errors.images as FieldError}
                register={register}
              />
            </div>
          </Section>

          <div className='flex items-center justify-end gap-3'>
            <Btn
              className='bg-transparent border border-gray-300 text-white font-medium text-sm px-6 py-2.5 rounded-md'
              text='Cancel'
            />
            <Btn
              type='submit'
              className='bg-orange-400 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md'
              text='submit'
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateProduct;
