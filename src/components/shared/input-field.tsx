"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Upload, Eye, EyeOff } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type InputFieldProps = {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  search?: boolean;
  options?: Option[];
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  error,
  disabled,
  search,
  options = [],
}: InputFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const baseInputClasses =
    " dark:bg-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-700 dark:focus:border-softPink-300 flex h-12 w-full text-zinc-800 outline-none rounded-lg border border-zinc-300 hover:border-zinc-400 focus:border-maroon-600  bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none  disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:border-none md:text-sm";
  const errorClasses = error
    ? "border-red-600 hover:border-red-600 focus:border-red-600 dark:border-red-500 dark:hover:border-red-500 dark:focus:border-red-500"
    : "border-zinc-300 hover:border-zinc-400 focus:border-maroon-600";
  const disabledClasses = disabled
    ? "cursor-not-allowed bg-zinc-100 text-zinc-400 border-none"
    : "";

  return (
    <Field className="w-full ">
      {label && (
        <FieldLabel
          htmlFor={name}
          className={error ? "text-red-600 dark:text-red-500" : ""}
        >
          {label}
        </FieldLabel>
      )}

      {type === "select" ? (
        <Select disabled={disabled}>
          <SelectTrigger
            id={name}
            className={`${baseInputClasses} ${errorClasses} ${disabledClasses}`}
          >
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="relative">
          {type === "file" ? (
            <>
              <Input
                ref={fileRef}
                type="file"
                id={name}
                name={name}
                disabled={disabled}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <div
                className={`${baseInputClasses} ${errorClasses} ${disabledClasses} flex items-center justify-between`}
              >
                <span className="dark:text-zinc-50 text-zinc-800">
                  {fileName}
                </span>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => fileRef.current?.click()}
                  className={`flex items-center gap-2 text-maroon-500 dark:text-softPink-400 `}
                >
                  <Upload size={17} />
                  <span>Upload</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Input
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                id={name}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className={`${
                  error
                    ? "border-red-600 focus:border-red-600 hover:border-red-600"
                    : "border-zinc-300 hover:border-zinc-400 focus:border-maroon-600"
                } ${search ? "pl-10" : ""}`}
              />

              {/* Search icon */}
              {search && (
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
              )}

              {/* Password toggle icon */}
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </Field>
  );
}
