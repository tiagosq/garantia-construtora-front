import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type IProps = {
  title: string;
  status: string;
  description?: string;
  observation?: string;
  attachments?: string[];
}

function Collapse({ title, description, observation, status, attachments }: IProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl text-typo-primary font-bold flex items-center">
        <span className={`text-sm mr-1 text-center w-20 p-1 rounded text-white-1 ${status ? 'bg-green-600' : 'bg-red-600'}`}>{status ? 'Concluída' : 'Pendente'}</span>
          {title}
        </h2>
        {toggle ? (
          <FaChevronUp onClick={() => setToggle(!toggle)} className="text-2xl text-blue-1 cursor-pointer" />
        ) : (
          <FaChevronDown onClick={() => setToggle(!toggle)} className="text-2xl text-blue-1 cursor-pointer" />
        )}  
      </div>
      <div className={`flex flex-col gap-2 ${toggle ? 'flex' : 'hidden'}`}>
        {description && (
          <>
            <h3 className="font-bold text-blue-1">Observações:</h3>
            <p className="text-typo-primary text-sm">{description}</p>
          </>
        )}
        {observation && (
          <>
            <h3 className="font-bold text-blue-1">Resposta:</h3>
            <p className="text-typo-primary text-sm">{observation}</p>
          </>
        )}
        {attachments && attachments.length > 0 && (
          <>
            <h3 className="font-bold text-blue-1">Anexos:</h3>
            <div className="flex gap-2">
              {attachments.map((attachment, i) => (
                <a key={i} href={attachment} target="_blank" rel="noreferrer" className="text-blue-1 hover:underline">{attachment}</a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Collapse;