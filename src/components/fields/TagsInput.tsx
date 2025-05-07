/** @format */

import { useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface TagsInputProps<T extends FieldValues> {
  label: string;
  id: string;
  placeholder: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  error?: string;
}

const TagsInput = <T extends FieldValues>({
  label,
  id,
  register,
  placeholder,
  name,
  setValue,
  error,
}: TagsInputProps<T>) => {
  const [tags, setTags] = useState<string[]>([]);
  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();
    if (event.key === "Enter" && inputValue) {
      event.preventDefault();
      setValue(name, [...tags, inputValue] as PathValue<T, Path<T>>); 
      setTags([...tags, inputValue]);
      event.currentTarget.value = "";
    }
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();
    if (inputValue) {
      setTags((prevTags) => {
        const updated = [...prevTags, inputValue];
        setValue(name, updated as PathValue<T, Path<T>>);
        return updated;
      });
      event.currentTarget.value = "";
    }
  };


  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
    setValue(
      name,
      tags.filter((tag: string) => tag !== tagToRemove) as PathValue<T, Path<T>>
    );
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase"
      >
        {label}
      </label>
      <div className="relative gap-2 flex flex-wrap items-center min-h-[50px] border border-gray-300 text-gray-900 text-sm rounded-lg p-2 dark:border-gray-600 dark:text-white">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="dark:text-white px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-sm tracking-wide text-red-500"
            >
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          onKeyDown={handleAddTag}
          onBlur={handleBlur}
          {...(register ? { ref: register(name).ref } : {})}
          className="flex-1 min-w-10 h-full w-full outline-none pl-1"
        />
      </div>
      {error && tags.length === 0 && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TagsInput;
