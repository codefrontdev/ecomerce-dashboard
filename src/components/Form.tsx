/** @format */

import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
}

const Form = <T extends FieldValues>({
  onSubmit,
  handleSubmit,
  children,
}: FormProps<T>) => {
  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
      className='w-full space-y-5'>
      {children}
    </form>
  );
};

export default Form;
