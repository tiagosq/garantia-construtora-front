import { useContext, useEffect, useState } from "react";
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
import { buildingSearchRequest } from "../../services/buildingsServices";
import cookie from "react-cookies";
import { AppContext } from "../../context/AppContext";

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
  const [buildings, setBuildings] = useState<{ id: string; name: string; }[]>([]);
  const { userData } = useContext(AppContext);
  const [form, setForm] = useState<IForm>({
    name: '',
    description: '',
    building: '',
    start_date: '',
    end_date: '',
    questions: [],
    status: true,
  });

  useEffect(() => {
    if(id) {
      // fetch maintenance data
      // fetch questions data
    }
  }, [id]);

  useEffect(() => {
    // fetch buildings data
    const token = cookie.load('GC_JWT_AUTH');
    if(userData?.data?.business?.id) {
      buildingSearchRequest(token, userData.data.business.id)
      .then((res) => {
        setBuildings([{ id: '', name: 'Selecione um empreendimento' }, ...res.data.data]);
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target: { value, name } } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { target: { value, name } } = e;
    const newQuestions = form.questions.map((question, i) => {
      if(i === index) {
        return {
          ...question,
          [name]: value,
        };
      }
      return question;
    });
    setForm({
      ...form,
      questions: newQuestions,
    });
  }

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setForm(prevForm => ({
      ...prevForm,
      [name]: !prevForm.status,
    }));
  };

  const validate = () => {
    console.log(form);
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
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
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
              options={buildings.length > 0 ? buildings.map((building: { id: string, name: string }) => ({
                value: building.id,
                label: building.name
              })) : [{ value: '', label: 'Nenhum empreendimento encontrado' }]}
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
              mask="00/00/0000"
              showMask
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
              mask="00/00/0000"
              showMask
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
            <p className="text-typo-primary">
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
              name="name"
              type="text"
              value={question.name}
              onChange={(e) => handleChangeQuestion(e, index)}
              placeholder={`Nome da Questão ${index + 1}`}
              disabled={type === 'view'}
              required
            />
            <TextArea
              name="description"
              value={question.description}
              onChange={(e) => handleChangeQuestion(e, index)}
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
