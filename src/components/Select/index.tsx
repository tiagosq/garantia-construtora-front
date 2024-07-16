type IProps = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  required?: boolean;
  customStyle?: string;
};

function Select({ name, options, onChange, value, customStyle = '', required }: IProps) {
  return (
    <select
      className={`w-full max-h-10 border bg-primary font-normal dark:text-typo-primary rounded py-2 px-3 border-gray-400 ${customStyle}`}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="dark:text-typo-primary">
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select;