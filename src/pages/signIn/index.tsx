/** @format */

import { z } from "zod";
import { SubmitHandler, useForm, Path, FieldError } from "react-hook-form";
import Form from "../../components/Form";
import Btn from "../../components/Btn";
import InputField from "../../components/fields/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { myAccount, signIn } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

// تعريف الـ Schema باستخدام Zod
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type User = z.infer<typeof userSchema>;

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.user
  );
  console.log("isAuthenticated", isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log("Sign in data:", data);
    dispatch(signIn(data))
      .then((result) => {
        console.log("Response from sign in:", result);
        if (result.meta.requestStatus === "rejected") {
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (result.meta.requestStatus === "fulfilled") {
          toast.success(result.payload?.message || "", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  const fields: Array<{
    name: Path<User>;
    label: string;
    type: string;
    placeholder: string;
    validation: { required: string };
  }> = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: { required: "Email is required" },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: { required: "Password is required" },
    },
  ];

  return (
    <div className='w-full h-full flex justify-center items-center  bg-[#fafaf2] dark:bg-gray-800'>
      <div className='p-14 max-w-xl w-lg bg-white shadow-lg rounded-xl flex flex-col justify-center items-center gap-3'>
        <h2 className='text-2xl font-semibold mb-4'>Sign In</h2>
        <p className='text-gray-500 mb-4 text-center font-medium'>
          Log in to your account
        </p>
        <Form<User> onSubmit={onSubmit} handleSubmit={handleSubmit}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              register={register}
              {...field}
              errors={errors[field.name as Path<User>] as FieldError}
            />
          ))}
          <Btn
            type='submit'
            text={status === "loading" ? "Loading..." : "Sign In"}
            className='w-full bg-teal-700 border text-white flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md'
          />
        </Form>
        <Btn
          type='submit'
          text='Sign Up With Google'
          className='w-full  border text-gray-900 flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md'
        />
        <Btn
          type='submit'
          text='Sign Up With Facebook'
          className='w-full border text-gray-900 flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md'
        />

        <p className='text-gray-500 text-center text-sm font-normal'>
          Don't have an account?{" "}
          <Link to='/sign-up' className='text-teal-700'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
