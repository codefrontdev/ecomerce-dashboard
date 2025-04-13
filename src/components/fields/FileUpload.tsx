/** @format */

import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
import {
  FieldError,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { FieldValues } from "react-hook-form";

interface FileUploadProps<T extends FieldValues> {
  id: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldError;
  register: UseFormRegister<T>;
  className?: string;
}

const FileUpload = <T extends FieldValues>({
  id,
  placeholder,
  accept = "image/*",
  multiple = false,
  name,
  errors,
  className,
  setValue,
}: FileUploadProps<T>) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      if (multiple) {
        setValue(name, [...selectedFiles, ...filesArray] as PathValue<
          T,
          Path<T>
          >);
          setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        } else {
        setValue(name, filesArray as PathValue<T, Path<T>>);
        setSelectedFiles(filesArray.slice(0, 1));
      }
    }
  };

  
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  
  const handleDragLeave = () => {
    setDragActive(false);
  };

  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files) {
      const filesArray = Array.from(event.dataTransfer.files);
      if (multiple) {
        setValue(name, [...selectedFiles, ...filesArray] as PathValue<
          T,
          Path<T>
        >);
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      } else {
        setValue(name, filesArray[0] as PathValue<T, Path<T>>);
        setSelectedFiles(filesArray.slice(0, 1));
      }
    }
  };

  
  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setValue(name, updatedFiles as PathValue<T, Path<T>>);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${className}`}>
      <label
        htmlFor={id}
        className={`flex relative overflow-hidden flex-col items-center justify-center w-full h-full ${
          !multiple && "border-2"
        } rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 
            ${
              dragActive
                ? "border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
            }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        {multiple ? (
          <Swiper
            className='w-full h-full'
            spaceBetween={10}
            slidesPerView={4}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 6,
              },
              1024: {
                slidesPerView: 7.5,
              },
            }}>
            {(selectedFiles.length > 0
              ? selectedFiles
              : Array.from({ length: 8 })
            ).map((file, index) => (
              <SwiperSlide key={`file-${index}`} className='py-1'>
                {file instanceof File ? (
                  <div className='relative'>
                    <img
                      loading='lazy'
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className='object-cover w-full h-14 rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveFile(index)}
                      className='absolute top-0 right-0 text-red-600 text-xs'>
                      X
                    </button>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center w-full h-14 border-2 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 
                        ${
                          dragActive
                            ? "border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
                        }`}
                  />
                )}

                {errors &&
                  !multiple &&
                  selectedFiles.length > 0 &&
                  errors.message && (
                    <p className='flex-1 text-red-600 mb-5 relative z-10 text-sm mt-1'>
                      {errors.message}
                    </p>
                  )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : selectedFiles.length > 0 ? (
          <div className='flex flex-col items-center justify-center p-2 w-full h-full'>
            <img
              loading='lazy'
              src={URL.createObjectURL(selectedFiles[0])}
              alt={selectedFiles[0].name}
              className='object-cover w-full h-full rounded-lg'
            />
            <button
              type='button'
              onClick={() => handleRemoveFile(0)}
              className='absolute top-0 right-0 text-red-600 text-xs'>
              X
            </button>
            {errors && errors.message && (
              <p className='text-red-600 text-sm mt-1'>{errors.message}</p>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center p-2 w-full h-full'>
            <p className='text-xs flex items-center flex-col text-gray-500 dark:text-gray-400'>
              {placeholder && (
                <CloudUpload size={32} className='text-teal-500' />
              )}
              {placeholder}
            </p>
            {errors && errors.message && (
              <p className='text-red-600 text-sm mt-1'>{errors.message}</p>
            )}
          </div>
        )}
        <input
          id={id}
          type='file'
          accept={accept}
          className='hidden'
          onChange={handleFileChange}
          multiple={multiple}
        />
      </label>
    </div>
  );
};

export default FileUpload;
