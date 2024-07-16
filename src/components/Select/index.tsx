type IProps = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

function Select({ options, onChange, value }: IProps) {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-md"
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

export default Select;