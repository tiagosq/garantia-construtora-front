type IProps = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  disabled?: boolean;
  onClick: () => void;
  customStyle?: string;
}

function Button({ type, text, disabled = false, onClick, customStyle = '' }: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full cursor-pointer disabled:cursor-not-allowed bg-blue-1 text-typo-invertSecondary dark:text-typo-primary p-2 rounded ${customStyle}
      hover:bg-blue-2 transition-colors duration-300 disabled:bg-gray-400 disabled:hover:bg-gray-400`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;