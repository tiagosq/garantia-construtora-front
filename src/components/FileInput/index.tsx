import { BsPaperclip } from "react-icons/bs";
import Input from "../Input";
import Label from "../Label";

type IProps = {
  name: string;
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
  accept?: string;
}

function FileInput({ name, text, value, onChange, customStyle = '', accept }: IProps) {
  return (
    <Label
      customStyle={`flex items-center justify-center grow bg-blue-1 cursor-pointer
        text-white-1 p-2 rounded font-normal ${customStyle} hover:bg-blue-2`}
      text={
        <span className="flex items-center justify-center mt-1">
          <BsPaperclip className="text-xl mb-1" /> {text}
        </span>
      }
    >
      <Input 
        type="file"
        name={name}
        customStyle="hidden"
        onChange={onChange}
        placeholder="Anexar Arquivos"
        accept={accept}
        value={value}
      />
    </Label>
  )
}

export default FileInput;
