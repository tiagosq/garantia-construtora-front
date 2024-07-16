type IProps = {
  type: 'button' | 'submit' | 'reset';
  text: string | React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  customStyle?: string;
}

function Button({ type, text, disabled = false, onClick, customStyle = '' }: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer disabled:cursor-not-allowed bg-blue-1 text-typo-invertSecondary
        dark:text-typo-primary px-4 py-2 rounded hover:bg-blue-2 transition-colors duration-300
        disabled:!bg-gray-400 ${customStyle}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;