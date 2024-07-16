type IProps = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  customStyle?: string;
};

function Select({ options, onChange, value, customStyle = '' }: IProps) {
  return (
    <select
      className={`w-full max-h-10 border bg-primary font-normal dark:text-typo-primary rounded py-2 px-3 border-gray-400 ${customStyle}`}
      onChange={onChange}
      value={value}
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