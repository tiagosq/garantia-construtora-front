import React from 'react';
import { IMaskInput } from 'react-imask';

type IProps = {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'file';
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
  disabled?: boolean;
  autoComplete?: string;
  accept?: string;
  mask?: string;
  showMask?: boolean;
}

function Input({
  type, name, value, placeholder, disabled, required = false, onChange, customStyle = '', autoComplete, accept, mask = '', showMask = false }: IProps
) {
  return (
    <IMaskInput
      mask={mask}
      unmask={showMask}
      type={type}
      name={name}
      value={value}
      onAccept={(value: unknown) => onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>)}
      className={`w-full max-h-10 border bg-primary font-normal rounded py-2 px-3 border-gray-400 ${customStyle}`}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      accept={accept}
    />
  );
}

export default Input;