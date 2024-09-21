import { useEffect, useState } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { FaRegFileAlt, FaRegFileImage, FaRegFilePdf, FaRegFileVideo, FaRegSave, FaTrashAlt } from "react-icons/fa";
import { MdBlock, MdOutlineCheckCircle, MdOutlineCircle } from "react-icons/md";
import FileInput from "../components/FileInput";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import cookie from 'react-cookies';
import { maintenanceFinishRequest, maintenanceRequest, questionsAnswerRequest, questionsRequest } from "../services/maintenanceServices";
import { HashLoader } from "react-spinners";
import { IMaintenance, IQuestion } from "../types/types";

function Answer() {
  const { business, maintenance } = useParams();
  const navigate = useNavigate();

  if(!business || !maintenance) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Residencial ou Manutenção não informados',
    }).then(() => {
      navigate('/maintenance');
    });
  }

  const templateQuestion = {
    id: '',
    name: '',
    description: '',
    answer: '',
    date: '',
    status: false,
    observations: '',
    photos: [] as File[],
    docs: [] as File[],
  };

  const [answers, setAnswers] = useState<IQuestion[]>([] as IQuestion[]);
  const [activeAnswer, setActiveAnswer] = useState<IQuestion>(answers[0]);
  const [index, setIndex] = useState<number>(0);
  const [form, setForm] = useState<IQuestion>(templateQuestion);
  const [maintenanceData, setMaintenanceData] = useState<IMaintenance>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    is_completed: false,
    business: '',
    building_name: '',
    building: '', // Add the 'building' property
    user: '',
  });

  const handleSave = () => {
    if (!maintenance || !business) return;
  
    const newAnswers = answers.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          ...form,
        };
      }
      return item;
    });
    setAnswers(newAnswers as IQuestion[]);
  
    if (index < answers.length - 1) {
      setActiveAnswer(answers[index + 1]);
      setIndex(index + 1);
    }
  
    console.log('Form Data:', form);
  
    questionsAnswerRequest(cookie.load('GC_JWT_AUTH'), maintenance, business, form)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Resposta salva com sucesso',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Houve um problema ao salvar a resposta.',
        });
        console.error('Error saving response:', error);
      });
  };
  
  const handleFinish = () => {
    if (!maintenance || !business) return;
  
    maintenanceFinishRequest(cookie.load('GC_JWT_AUTH'), maintenance, maintenanceData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Manutenção concluída',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Houve um problema ao concluir a manutenção.',
        });
        console.error('Error finishing maintenance:', error);
      });
  };
  // Função para lidar com mudança de arquivo
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files ? Array.from(e.target.files) : [];

  // Filtrando as fotos e vídeos
  const photos = files.filter(file =>
    file.type.startsWith('image/') || file.type.startsWith('video/')
  );

  // Filtrando os documentos (PDF e XML)
  const docs = files.filter(file =>
    file.type === 'application/pdf' || file.type === 'application/xml'
  );

  // Atualizando o estado com os novos arquivos
  // @ts-expect-error 123
  setForm(prevForm => ({
    ...prevForm,
    photos: [...(prevForm.photos || []), ...photos], // Adiciona arquivos File diretamente
    docs: [...(prevForm.docs || []), ...docs], // Adiciona arquivos File diretamente
  }));
};

  const iconStatus = [
    <MdOutlineCircle className="mb-0.5" />,
    <MdOutlineCheckCircle className="mb-0.5 text-green-600" />,
    <MdOutlineCircle className="mb-0.5 text-blue-1" />,
    <MdBlock className="mb-0.5 text-red-600" />,
  ];

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

  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    if(!maintenance || !business) return;
    maintenanceRequest(token, maintenance, business)
      .then((data) => {
        setMaintenanceData({ ...data.data });
      });

    questionsRequest(token, maintenance, business)
      .then(({ data }) => {
        const parsedData = data.data.map((item: IQuestion) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          date: item.date,
          status: item.status,
          observations: item.observations,
          photos: [],
          docs: [],
        }));
        setAnswers(parsedData);
        setActiveAnswer(parsedData[0]);
        setForm(parsedData[0]);
        setIndex(0);
      });
  }, []);

  if(answers.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <HashLoader color="#0078d4" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-bold text-typo-primary">
          {maintenanceData.building_name}
        </h1>
      </div>
      <div className="flex items-start justify-stretch gap-8">
        <div className="flex flex-col justify-start gap-4 grow">
          <h2 className="text-blue-1 font-bold text-2xl text-nowrap">
            {maintenanceData.name}
          </h2>
          <div className="flex flex-col gap-4">
            {answers.map((item, i) => (
              <h3
                key={i}
                className={`flex items-center gap-1 text-typo-primary cursor-pointer ${index === i && 'font-bold'}`}
                onClick={() => {
                  setActiveAnswer(item);
                  setIndex(i);
                  setForm(item as IQuestion);
                }}
              >
                {iconStatus[Number(item.status) || 0]}
                {item.name}
              </h3>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 grow-[2]">
          <h3 className="text-blue-1 font-bold text-2xl mb-4">
            {activeAnswer.name}
          </h3>
          <p className="text-sm text-typo-primary">
            {activeAnswer.description}
          </p>
          <div className="flex gap-8 items-baseline">
            <Label text="Data de Preenchimento">
              <Input
                type="date"
                name="date"
                value={form?.date ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setForm({ ...form, date: e.target.value });
                }}
                placeholder="00/00/0000"
                required
              />
            </Label>
            <Label text="Situação">
              <Select
                name="date"
                value={form.status?.toString() ?? '0'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setForm({ ...form, status: e.target.value === 'true' });
                }}
                required
                options={[
                  { value: false, label: 'Pendente' },
                  { value: true, label: 'Respondido' },
                ]}
              />
            </Label>
          </div>
          <div>
            <Label text="Observações">
              <TextArea
                name="observations"
                value={form.observations ?? ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setForm({ ...form, observations: e.target.value });
                }}
                placeholder="Observações"
                required
              />
            </Label>
          </div>
          <div
            className="flex items-start gap-4"
          >
            <div className="flex flex-col grow max-w-[50%]">
              <p className="font-bold text-typo-primary">Fotos e Vídeos</p>
              <FileInput
                name="photos"
                text="Anexar Arquivos"
                accept="image/*,video/*"
                value=""
                onChange={handleFileChange}
              />
              <div className="grid-cols-1 gap-4 grid mt-1">
                {form.photos && form.photos.map((file, i) => (
                  <div key={i} className="flex gap-1">
                    {iconFiles[file.type] || iconFiles['application/txt']}
                    <p className="text-sm">{`${file.name.slice(0, 20)}`}</p>
                    <FaTrashAlt className="cursor-pointer text-red-600" onClick={() => {
                      if(!form.photos) return;
                      const newPhotos = form.photos.filter((_, idx) => idx !== i);
                      setForm({ ...form, photos: newPhotos });
                    }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col grow max-w-[50%]">
              <p className="font-bold text-typo-primary">Notas e Documentos</p>
              <FileInput
                name="docs"
                text="Anexar Arquivos"
                accept=".pdf, .xml"
                value=""
                onChange={handleFileChange}
              />
              <div className="grid-cols-1 gap-4 grid mt-1">
                {form.docs && form.docs.map((file, i) => (
                  <div key={i} className="flex gap-1">
                    {iconFiles[file.type] || iconFiles['application/txt']}
                    <p className="text-sm">{`${file.name.slice(0, 20)}`}</p>
                    <FaTrashAlt className="cursor-pointer text-red-600" onClick={() => {
                      if(!form.docs) return;
                      const newDocs = form.docs.filter((_, idx) => idx !== i);
                      setForm({ ...form, docs: newDocs });
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              disabled={!form.status || !form.date  || form.date === '0000-00-00' || !form.observations}
              text={
                <span
                  className="inline-flex items-center gap-2 mt-1"
                >
                  <FaRegSave className="mb-1" /> Salvar
                </span>
              }
              type="button"
              onClick={handleSave}
              customStyle="bg-red-1 text-white-1"
            />
            {answers.every(item => item.status) && (
              <Button
                text={
                  <span
                    className="inline-flex items-center gap-2 mt-1"
                  >
                    <FaRegSave className="mb-1" /> Finalizar
                  </span>
                }
                type="button"
                onClick={handleFinish}
                disabled={answers.some(item => !item.status)}
                customStyle="bg-red-1 text-white-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Answer;