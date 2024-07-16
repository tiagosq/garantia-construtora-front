type IProps = {
  label: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  customStyle?: string;
};

function Checkbox({
  label, name, checked, disabled, required, onClick, customStyle = '',
}: IProps) {
  return (
    <label className={`w-full flex gap-1 text-sm text-black-4 dark:text-typo-secondary ${customStyle}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        required={required}
        onClick={onClick}
      />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox;