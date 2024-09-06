import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { FaRegSave } from "react-icons/fa";
import ErrorList from "../../components/ErrorList";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { businessCreateRequest, businessGetRequest, businessUpdateRequest } from "../../services/businessServices";
import cookie from "react-cookies";

const defaultForm = {
  name: '',
  cnpj: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  status: true,
};

function FormBusiness({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState(defaultForm);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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
    if (form.name === '' || form.email === '' || form.phone === '' || form.cnpj === '') {
      return true;
    }
    return false;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    if (!form.name  || !form.email || !form.phone || !form.cnpj) {
      errors.push('Preencha todos os campos obrigatórios');
    }
    setErrors(errors);
    if(errors.length > 0) return;
    const token = cookie.load('GC_JWT_AUTH');
    if(!id) {
      businessCreateRequest(token, form)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Função cadastrada com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/business');
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao cadastrar.',
          icon: 'error',
        });
      });
    } else {
      businessUpdateRequest(token, form, id)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Função cadastrada com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/business');
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao cadastrar.',
          icon: 'error',
        });
      });
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const token = cookie.load('GC_JWT_AUTH');
      businessGetRequest(token, id)
      .then((data) => {
        setForm({
          ...data.data
        });
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setForm(defaultForm);
    }
  }, [id]);

  if(id && isLoading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <HashLoader color="#0078d4" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1000px]">
      {type === 'edit' ? (
      <h1 className="mb-8 text-3xl font-bold text-blue-1">
        {id ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
      </h1>
      ) : (
      <h1 className="mb-8 text-3xl font-bold text-blue-1">
        Visualizar Empresa
      </h1>
      )}
      <ErrorList errors={errors} />
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome da Empresa"
            customStyle="grow"
          >
            <Input
              type="text"
              name="name"
              required
              placeholder="Nome da Empresa"
              onChange={handleChange}
              value={form.name}
              disabled={type === 'view'}
            />
          </Label>
          <Label
            text="CNPJ"
            customStyle="grow"
          >
            <Input
              type="text"
              name="cnpj"
              required
              placeholder="00.000.000/0000-00"
              mask="00.000.000/0000-00"
              showMask
              onChange={handleChange}
              value={form.cnpj}
              disabled={type === 'view'}
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Telefone"
            customStyle="grow"
          >
            <Input
              type="text"
              name="phone"
              required
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
              showMask
              onChange={handleChange}
              value={form.phone}
              disabled={type === 'view'}
            />
          </Label>
          <Label
            text="E-mail"
            customStyle="grow"
          >
            <Input
              type="email"
              name="email"
              required
              placeholder="contato@garantiaconstrutora.com.br"
              onChange={handleChange}
              value={form.email}
              disabled={type === 'view'}
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Endereço"
            customStyle="grow"
          >
            <Input
              type="text"
              name="address"
              placeholder="Endereço"
              onChange={handleChange}
              value={form.address}
              disabled={type === 'view'}
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="CEP"
            customStyle="grow"
          >
            <Input
              type="text"
              name="zip"
              placeholder="00000-000"
              mask="00000-000"
              showMask
              onChange={handleChange}
              value={form.zip}
              disabled={type === 'view'}
            />
          </Label>
          <Label
            text="Cidade"
            customStyle="grow"
          >
            <Input
              type="text"
              name="city"
              placeholder="Cidade"
              onChange={handleChange}
              value={form.city}
              disabled={type === 'view'}
            />
          </Label>
          <Label
            text="Estado"
            customStyle="grow"
          >
            <Select
              name="state"
              value={form.state}
              onChange={handleChange}
              disabled={type === 'view'}
              options={[
                { value: 'AC', label: 'AC' },
                { value: 'AL', label: 'AL' },
                { value: 'AP', label: 'AP' },
                { value: 'AM', label: 'AM' },
                { value: 'BA', label: 'BA' },
                { value: 'CE', label: 'CE' },
                { value: 'DF', label: 'DF' },
                { value: 'ES', label: 'ES' },
                { value: 'GO', label: 'GO' },
                { value: 'MA', label: 'MA' },
                { value: 'MT', label: 'MT' },
                { value: 'MS', label: 'MS' },
                { value: 'MG', label: 'MG' },
                { value: 'PA', label: 'PA' },
                { value: 'PB', label: 'PB' },
                { value: 'PR', label: 'PR' },
                { value: 'PE', label: 'PE' },
                { value: 'PI', label: 'PI' },
                { value: 'RJ', label: 'RJ' },
                { value: 'RN', label: 'RN' },
                { value: 'RS', label: 'RS' },
                { value: 'RO', label: 'RO' },
                { value: 'RR', label: 'RR' },
                { value: 'SC', label: 'SC' },
                { value: 'SP', label: 'SP' },
                { value: 'SE', label: 'SE' },
                { value: 'TO', label: 'TO' },
              ]}
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Status"
            customStyle="grow"
          >
            <Checkbox
              name="status"
              checked={form.status}
              onChange={handleClick}
              disabled={type === 'view'}
              label="Empresa ativa"
            />
          </Label>
        </div>
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

export default FormBusiness;
