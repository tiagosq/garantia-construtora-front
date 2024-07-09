type IProps = {
  text: string;
  customStyle?: string;
  children: React.ReactNode;
}

function Label({ text, customStyle = '', children }: IProps) {
  return (
    <label className={`text-typo-primary text-sm font-bold mb-2 ${customStyle}`}>
      <p className="mb-1">{text}</p>
      {children}
    </label>
  )
}

export default Label