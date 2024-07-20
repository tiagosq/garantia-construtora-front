type IProps = {
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  customStyle?: string;
  disabled?: boolean;
  autoComplete?: string;
}

function TextArea({
  name, value, placeholder, disabled, required = false, onChange, customStyle = '', autoComplete }: IProps
) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full min-h-24 border bg-primary font-normal rounded py-2 px-3 border-gray-400 ${customStyle}`}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
    ></textarea>
  )
}

export default TextArea;