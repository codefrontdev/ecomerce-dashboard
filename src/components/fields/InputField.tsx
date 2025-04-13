/** @format */

import { ReactNode, useId } from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";



interface InputFieldProps<T extends FieldValues> {
  label?: string;
  register?: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  btn?: ReactNode;
  errors: FieldError;
  type?: string;
}

const InputField = <T extends FieldValues>({ label, placeholder, btn, register, name, errors, type='text' }: InputFieldProps<T>) => {
  const id = useId()
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-500 uppercase'>
        {label}
      </label>
      <input
        type={type}
        {...(register ? register(name) : {})}
        id={id}
        placeholder={placeholder}
        className='bg-gray-50 border-1 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
      />
      {btn}
      {
        errors && (
          errors.message && <p className='text-red-600 text-sm mt-1'>{errors.message}</p>
        )
      }
    </div>
  );
};

export default InputField;
