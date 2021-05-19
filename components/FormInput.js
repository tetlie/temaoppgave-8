import React from "react";

const FormInput = ({ label, id, type, errors, register, ...rest }) => {
  const error = errors?.[id]?.message;

  return (
    <div className="my-2">
      <label
        htmlFor={id}
        className={`font-bold ${
          error ? "text-error-default" : "text-success-default"
        }`}
      >
        {label}
      </label>
      <p className="text-error-default">{error && error}</p>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={label}
        className={`focus:outline-none border-2 mt-1 w-2/3 font-bold px-5 py-1 rounded-2xl text-black dark:text-white ${
          error
            ? "bg-error-lighter dark:bg-error-dark border-error-lighter dark:border-error-dark focus:border-error-default dark:focus:border-error-light"
            : "focus:border-success-default border-daccent-700 bg-daccent-700 dark:bg-accent-700 dark:border-accent-700"
        }`}
        ref={register}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
