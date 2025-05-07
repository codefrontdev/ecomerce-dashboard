/** @format */

import { FieldError, Path, UseFormRegister } from "react-hook-form";

import { FieldValues } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldError;
}
const SelectField = <T extends FieldValues>({
  label,
  id,
  options,
  defaultValue,
  register,
  name,
  errors,
}: SelectFieldProps<T>) => {

  return (
    <div className='text-gray-400'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase'>
        {label}
      </label>
      <select
        id={id}
        {...register(name)}
        defaultValue={defaultValue}
        className={`bg-gray-50 border-1 font-medium outline-none border-gray-300 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
          defaultValue ? " text-gray-400" : ""
        } dark:focus:ring-teal-500 dark:focus:border-teal-500`}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.message && (
        <p className='text-red-600 text-sm mt-1'>{errors.message}</p>
      )}
    </div>
  );
};
export default SelectField;
