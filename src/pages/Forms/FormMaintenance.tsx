import { useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { FaRegSave, FaTrashAlt } from "react-icons/fa";
import ErrorList from "../../components/ErrorList";
import Swal from "sweetalert2";
import TextArea from "../../components/TextArea";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

type IForm = {
  name: string;
  description: string;
  building: string;
  start_date: string;
  end_date: string;
  questions: {
    name: string;
    description: string;
  }[];
  status: boolean;
};

function FormMaintenance({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const { id } = useParams();
  const [isLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState<IForm>({
    name: '',
    description: '',
    building: '',
    start_date: '',
    end_date: '',
    questions: [],
    status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target: { value, name } } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setForm(prevForm => ({
      ...prevForm,
      [name]: !prevForm.status,
    }));
  };

  const validate = () => {
    if (!form.name || !form.description || !form.building || !form.start_date || !form.end_date) {
      return true;
    }
    if(form.start_date > form.end_date) {
      return true;
    }
    if(form.questions.length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    if (!form.name || !form.description || !form.building || !form.start_date || !form.end_date) {
      errors.push('Preencha todos os campos obrigatórios');
    }
    if(form.start_date > form.end_date) {
      errors.push('Data de início deve ser menor que a data final');
    }
    if(form.questions.length === 0) {
      errors.push('Adicione pelo menos uma questão');
    }
    setErrors(errors);
    if(errors.length === 0) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Empreendimento cadastrado com sucesso.',
        icon: 'success',
      });
    }
  };

  const newQuestion = () => {
    const newQuestion = {
      name: '',
      description: '',
    };
    setForm(prevForm => ({
      ...prevForm,
      questions: [...prevForm.questions, newQuestion],
    }));
  };

  if(id && isLoading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <HashLoader color="#0078d4" />
      </div>
    )
  }
  return (
    <div className="w-full h-full max-w-[1000px]">
      <h1 className="mb-8 text-3xl font-bold text-blue-1">Cadastrar Nova Manutenção</h1>
      <ErrorList errors={errors} />
      <form className="w-full h-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome da Manutenção"
            customStyle="grow"
          >
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome do Manutenção"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Empreendimento"
            customStyle="grow"
          >
            <Select
              name="building"
              value={form.building}
              onChange={handleChange}
              disabled={type === 'view'}
              options={[
                { value: '1', label: 'Empreendimento 1' },
                { value: '2', label: 'Empreendimento 2' },
              ]}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Descrição"
            customStyle="grow"
          >
            <TextArea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Início da Manutenção"
            customStyle="grow"
          >
            <Input
              name="start_date"
              type="date"
              value={form.start_date}
              placeholder="00/00/0000"
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Prazo Final"
            customStyle="grow"
          >
            <Input
              name="end_date"
              type="date"
              placeholder="00/00/0000"
              value={form.end_date}
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            checked={form.status}
            name="active"
            label="Manutenção Ativa"
            disabled={type === 'view'}
            onChange={handleClick}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-blue-1">Questões</h2>
          <Button
            type="button"
            onClick={newQuestion}
            text="Adicionar Questão"
            customStyle="!bg-blue-2 text-sm"
          />
        </div>
        {form.questions.map((question, index) => (
          <div key={index} className="flex flex-wrap flex-col gap-2">
            <p>
              <b>{`Questão ${index + 1}`}</b>
              <FaTrashAlt
                className="inline-block ml-2 mb-1 text-red-500 cursor-pointer"
                onClick={() => {
                  setForm(prevForm => ({
                    ...prevForm,
                    questions: prevForm.questions.filter((_, i) => i !== index),
                  }));
                }}
              />
            </p>
            <Input
              name={`question-${index}-name`}
              type="text"
              value={question.name}
              onChange={handleChange}
              placeholder={`Nome da Questão ${index + 1}`}
              disabled={type === 'view'}
              required
            />
            <TextArea
              name={`question-${index}-description`}
              value={question.description}
              onChange={handleChange}
              placeholder={`Descrição da Questão ${index + 1}`}
              disabled={type === 'view'}
              required
            />
          </div>
        ))}
        {type === 'edit' && (
        <div className="flex flex-wrap gap-4 justify-end">
          <Button
            type="submit"
            disabled={validate()}
            text={(
              <span className="inline-flex items-end gap-1 text-2xl">
                <FaRegSave className="mb-1" /> Salvar
              </span>
            )}
            customStyle="!bg-blue-2 px-8 py-3 text-sm"
          />
        </div>
        )}
      </form>
    </div>
  )
}

export default FormMaintenance;
