import { useState } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { FaRegFileAlt, FaRegFileImage, FaRegFilePdf, FaRegFileVideo, FaRegSave } from "react-icons/fa";
import { MdBlock, MdOutlineCheckCircle, MdOutlineCircle } from "react-icons/md";
import FileInput from "../components/FileInput";

type IAttachment = {
  name: string;
  type: string;
  size: number;
  url: string;
};

type IQuestion = {
  name: string;
  description: string;
  date: string;
  status: string;
  observations: string;
  photos: IAttachment[];
  docs: IAttachment[];
};

function Answer() {
  const templateQuestion = {
    name: '',
    description: '',
    date: '',
    status: '',
    observations: '',
    photos: [],
    docs: [],
  };

  const question = [
    {
      ...templateQuestion,
      name: 'Texto da primeira questão',
      description: 'Descrição da primeira questão, com mais detalhes, se necessário e com a quantidade de caracteres que for necessário para a descrição da questão em si.',
    },
    {
      ...templateQuestion,
      name: 'Texto da segunda questão',
      description: 'Descrição da segunda questão, com mais detalhes, se necessário e com a quantidade de caracteres que for necessário para a descrição da questão em si.',
    },
    {
      ...templateQuestion,
      name: 'Texto da terceira questão',
      description: 'Descrição da terceira questão, com mais detalhes, se necessário e com a quantidade de caracteres que for necessário para a descrição da questão em si.',
    },
    {
      ...templateQuestion,
      name: 'Texto da quarta questão',
      description: 'Descrição da quarta questão, com mais detalhes, se necessário e com a quantidade de caracteres que for necessário para a descrição da questão em si.',
    },
    {
      ...templateQuestion,
      name: 'Texto da quinta questão',
      description: 'Descrição da quinta questão, com mais detalhes, se necessário e com a quantidade de caracteres que for necessário para a descrição da questão em si.',
    },
  ];

  const [answers, setAnswers] = useState<IQuestion[]>(question as IQuestion[]);
  const [activeAnswer, setActiveAnswer] = useState<IQuestion>(answers[0]);
  const [index, setIndex] = useState<number>(0);
  const [form, setForm] = useState<IQuestion>(templateQuestion);

  const handleSave = () => {
    const newAnswers = answers.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          ...form,
        }
      }
      return item;
    });
    setAnswers(newAnswers as IQuestion[]);
    if (index < answers.length - 1) {
      setActiveAnswer(answers[index + 1]);
      setIndex(index + 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    console.log(files);
    const photos = files.filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    const docs = files.filter(file => 
        file.type.startsWith('application/pdf') || file.type.startsWith('application/xml')
    );

    setForm({
      ...form,
      photos: [...form.photos, ...photos.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }))],
      docs: [...form.docs, ...docs.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }))],
    })
  };

  const iconStatus = [
    <MdOutlineCircle className="mb-0.5" />,
    <MdOutlineCheckCircle className="mb-0.5 text-green-600" />,
    <MdOutlineCircle className="mb-0.5 text-blue-1" />,
    <MdBlock className="mb-0.5 text-red-600" />,
  ];

  const iconFiles: { [key: string]: JSX.Element } = {
    'image': <FaRegFileImage />,
    'video': <FaRegFileVideo />,
    'application/pdf': <FaRegFilePdf />,
    'application/xml': <FaRegFileAlt />,
  }

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-bold">
          Nome do Residencial
        </h1>
      </div>
      <div className="flex items-start justify-stretch gap-8">
        <div className="flex flex-col justify-start gap-4 grow">
          <h2 className="text-blue-1 font-bold text-2xl text-nowrap">
            Nome da Manutenção
          </h2>
          <div className="flex flex-col gap-4">
            {answers.map((item, i) => (
              <h3
                key={i}
                className={`flex items-center gap-1cursor-pointer ${index === i && 'font-bold'}`}
                onClick={() => {
                  console.log(item);
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
          <p className="text-sm">
            {activeAnswer.description}
          </p>
          <div className="flex gap-8 items-baseline">
            <Label text="Data de Preenchimento">
              <Input
                type="date"
                name="date"
                value={form.date}
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
                value={form.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setForm({ ...form, status: e.target.value });
                }}
                required
                options={[
                  { value: '0', label: 'Pendente' },
                  { value: '1', label: 'Respondido' },
                  { value: '2', label: 'Em andamento' },
                  { value: '3', label: 'Cancelado' },
                ]}
              />
            </Label>
          </div>
          <div>
            <Label text="Observações">
              <TextArea
                name="observations"
                value={form.observations}
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
              <p className="font-bold">Fotos e Vídeos</p>
              <FileInput
                name="photos"
                text="Anexar Arquivos"
                accept="image/*,video/*"
                value=""
                onChange={handleFileChange}
              />
              <div className="grid-cols-2 gap-4 grid mt-1">
                {form.photos.map((file, i) => (
                  <div key={i} className="flex">
                    {iconFiles[file.type]}<p className="text-sm">{`${file.name.slice(0, 15)}${file.name.length > 15 && '...'}`}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col grow max-w-[50%]">
              <p className="font-bold">Notas e Documentos</p>
              <FileInput
                name="docs"
                text="Anexar Arquivos"
                accept=".pdf, .xml"
                value=""
                onChange={handleFileChange}
              />
              <div className="grid-cols-2 gap-4 grid mt-1">
                {form.docs.map((file, i) => (
                  <div key={i} className="flex">
                    {iconFiles[file.type]}<p className="text-sm">{`${file.name.slice(0, 15)}${file.name.length > 15 && '...'}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              disabled={!['1', '3', ''].includes(form.status) || !form.date || !form.observations}
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
            {answers.every(item => !['1', '3', ''].includes(item.status)) && (
              <Button
                text={
                  <span
                    className="inline-flex items-center gap-2 mt-1"
                  >
                    <FaRegSave className="mb-1" /> Finalizar
                  </span>
                }
                type="button"
                onClick={handleSave}
                disabled={answers.every(item => !['1', '3', ''].includes(item.status))}
                customStyle="bg-red-1 text-white-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Answer