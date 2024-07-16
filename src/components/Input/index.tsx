type IProps = {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date';
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
}

function Input({
  type, name, value, placeholder, required = false, onChange, customStyle = '' }: IProps
) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full max-h-10 border bg-primary font-normal rounded py-2 px-3 border-gray-400 ${customStyle}`}
      placeholder={placeholder}
      required={required}
    />
  )
}

export default Input;