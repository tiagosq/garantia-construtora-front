type IProps = {
  label: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
};

function Checkbox({
  label, name, checked, disabled, required, onChange, customStyle = '',
}: IProps) {
  return (
    <label className={`w-full flex gap-1 text-sm text-black-4 dark:text-typo-secondary ${customStyle}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox;