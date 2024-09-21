import React from 'react';

type IProps = {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'file' | 'hidden';
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
  disabled?: boolean;
  autoComplete?: string;
  accept?: string;
  mask?: string;
  showMask?: boolean;
}

function Input({
  type, name, value, placeholder, disabled, required = false, onChange, customStyle = '', autoComplete, accept }: IProps
) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full max-h-10 border bg-primary font-normal text-typo-primary rounded py-2 px-3 border-gray-400 ${customStyle}`}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      accept={accept}
    />
  );
}

export default Input;