/** @format */

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-input.css";
import { Calendar } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";

interface DateInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  id: string;
  placeholder?: string;
  errors: FieldError;

  setValue: UseFormSetValue<T>;
}

const CustomDatePicker = <T extends FieldValues>({
  label,
  setValue,
  name,
  id,
  placeholder = "Select date & time",
  errors,
}: DateInputProps<T>) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase'>
        {label}
      </label>
      <div className='relative z-10 flex items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-teal-500 focus-within:border-teal-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-within:ring-teal-500 dark:focus-within:border-teal-500'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            if (date) {
              setValue(name, new Date(date) as PathValue<T, Path<T>>);
              }
          }}
          placeholderText={placeholder}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          dateFormat='MMMM d, yyyy h:mm aa'
          className='bg-transparent w-full h-full outline-none'
        />
        <Calendar size={16} className='absolute right-2 z-0' />
      </div>
      {(errors && (!selectedDate || selectedDate < new Date())) && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
    </div>
  );
};

export default CustomDatePicker;
