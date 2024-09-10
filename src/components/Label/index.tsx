type IProps = {
  text: string | React.ReactNode;
  customStyle?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Label({ text, customStyle = '', children, required = false }: IProps) {
  return (
    <label className={`text-typo-primary text-sm font-bold ${customStyle}`}>
      <p className="mb-1">{text}{required && <span className="text-red-600 ml-0.5">*</span>}</p>
      {children}
    </label>
  )
}

export default Label