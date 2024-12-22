import React, { useState } from "react";

const FormInput = ({
  label,
  type,
  placeholder,
  required = false,
  onChange,
  value,
  validator = () => {},
  name,
  error,
  resetError,
  leftIcon,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const response = validator(inputValue);
    setIsValid(response); // Update the validity state
    onChange(inputValue); // Pass the input value to parent
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle password visibility
  };

  return (
    <div>
      <div className="relative mb-2">
        <label className="absolute pl-12 bottom-12 text-sm text-gray-800">
          {label}
        </label>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          onFocus={resetError}
          type={type === "password" && isPasswordVisible ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          required={required}
          className={`bg-gray-50 border ${
            error ? "border-red-600" : "border-gray-300"
          }  text-gray-900 text-md rounded-2xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 block
           w-full ${leftIcon && "pl-12"} p-6 outline-none font-medium`}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility} // Add click handler
          >
            {isPasswordVisible ? (
              <img
                src="../assets/visibility_off.png" // "Hide password" icon
                alt="Hide Password Icon"
                className="w-6 h-6"
              />
            ) : (
              <img
                src="../assets/visibility.png" // "Show password" icon
                alt="Show Password Icon"
                className="w-6 h-6"
              />
            )}
          </div>
        )}
      </div>
      {!isValid?.isValid && error === null && (
        <span className="mt-2 text-sm text-red-600">{isValid?.msg}</span>
      )}
      {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default FormInput;
