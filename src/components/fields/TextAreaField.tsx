/** @format */

import { useId } from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextAreaFieldProps<T extends FieldValues> {
  label?: string;
  placeholder: string;
  rows: number;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldError;
}

const TextAreaField = <T extends FieldValues>({
  label,
  placeholder,
  rows,
  register,
  name,
  errors
}: TextAreaFieldProps<T>) => {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase'>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className='resize-none block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
        placeholder={placeholder}
        {...register(name)} // ربط الـ register مع الـ name
      ></textarea>
      {errors && errors.message && (
        <p className='text-red-600 text-sm mt-1'>{errors.message}</p>
      )}
    </div>
  );
};

export default TextAreaField;
