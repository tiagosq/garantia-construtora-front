import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaRegFileAlt, FaRegFileImage, FaRegFilePdf, FaRegFileVideo } from "react-icons/fa";
import { IAttachment } from "../../types/types";
import { BASE_URL } from "../../services/maintenanceServices";

type IProps = {
  title: string;
  status: string;
  description?: string;
  observations?: string;
  attachments?: IAttachment[];
}

function Collapse({ title, description, observations, status, attachments }: IProps) {
  const [toggle, setToggle] = useState(false);

  const iconFiles: { [key: string]: JSX.Element } = {
    'image/png': <FaRegFileImage />,
    'image/jpg': <FaRegFileImage />,
    'image/jpeg': <FaRegFileImage />,
    'image/gif': <FaRegFileImage />,
    'image/svg': <FaRegFileImage />,
    'video/mp4': <FaRegFileVideo />,
    'video/avi': <FaRegFileVideo />,
    'video/mov': <FaRegFileVideo />,
    'application/pdf': <FaRegFilePdf />,
    'application/xml': <FaRegFileAlt />,
    'application/json': <FaRegFileAlt />,
    'application/doc': <FaRegFileAlt />,
    'application/docx': <FaRegFileAlt />,
    'application/xls': <FaRegFileAlt />,
    'application/xlsx': <FaRegFileAlt />,
    'application/txt': <FaRegFileAlt />,
  };

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
        {observations && (
          <>
            <h3 className="font-bold text-blue-1">Resposta:</h3>
            <p className="text-typo-primary text-sm">{observations}</p>
          </>
        )}
        {attachments && attachments.length > 0 && (
          <>
            <h3 className="font-bold text-blue-1">Anexos:</h3>
            <div className="flex gap-2">
              {attachments.map((attachment, i) => (
                <a key={i} href={`${BASE_URL}/attachment/${attachment.path}`} target="_blank" rel="noreferrer" className="flex gap-px items-baseline hover:underline">
                  {iconFiles[attachment.type] || iconFiles['application/txt']}
                  {attachment.name}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Collapse;