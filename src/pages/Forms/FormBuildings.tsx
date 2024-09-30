import { useContext, useEffect, useState } from "react";
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
import { buildingCreateRequest, buildingGetRequest, buildingUpdateRequest } from "../../services/buildingsServices";
import cookie from "react-cookies";
import { getCEP } from "../../services/brasilAPIServices";
import { AppContext } from "../../context/AppContext";

const defaultForm = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  manager_name: '',
  phone: '',
  email: '',
  site: '',
  business: '',
  owner: '',
  construction_date: '',
  delivered_date: '',
  warranty_date: '',
  status: true
};

function FormBuildings({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState(defaultForm);
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (userData.data) {
      const permissions = userData.data.role.permissions.building;
      if ((!permissions.create && type === 'edit') || (!permissions.read && type === 'view') || (!permissions.update && type === 'edit' && id)) {
        Swal.fire({
          title: 'Acesso negado',
          text: 'Você não tem permissão para acessar esta página.',
          icon: 'error',
        }).then(() => {
          navigate(-1);
        });
      }
    }
  }, [userData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value, name } } = e;
    setForm({
      ...form,
      [name]: value,
    });

    if(name === 'zip' && value.length === 8) {
      getCEP(value)
      .then((data) => {
        setForm({
          ...form,
          zip: value ?? '',
          city: data.city ?? '',
          address: data.street ?? '',
          state: data.uf ?? '',
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Erro!',
          text: 'CEP inválido.',
          icon: 'error',
        });
      });
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setForm(prevForm => ({
      ...prevForm,
      [name]: !prevForm.status,
    }));
  };

  const validate = () => false;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    if (!form.name  || !form.construction_date || !form.delivered_date || !form.warranty_date) {
      errors.push('Preencha todos os campos obrigatórios');
    }
    setErrors(errors);
    const token = cookie.load('GC_JWT_AUTH');
    if(!id) {
      buildingCreateRequest(token, form)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Empreendimento cadastrado com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/buildings');
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
      buildingUpdateRequest(token, form, id)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Empreendimento atualizado com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/buildings');
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
      if(!userData?.data?.business?.id) return;
      const token = cookie.load('GC_JWT_AUTH');
      buildingGetRequest(token, id, userData.data.business.id)
      .then((data) => {
        data.data.construction_date = new Date(data.data.construction_date).toISOString().split('T')[0];
        data.data.delivered_date = new Date(data.data.delivered_date).toISOString().split('T')[0];
        data.data.warranty_date = new Date(data.data.warranty_date).toISOString().split('T')[0];
        delete data.data.owner;
        setForm({
          ...data.data,
          business: userData?.data?.business?.id ?? '',
        });
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setForm(defaultForm);
    }
  }, [id]);

  useEffect(() => {
    setForm({
      ...form,
      business: userData?.data?.business?.id ?? '',
      owner: userData?.data?.id ?? '',
    });
  }, [userData]);

  if(id && isLoading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <HashLoader color="#0078d4" />
      </div>
    )
  }

  return (
    <div className="w-full h-full max-w-[1000px]">
      <h1 className="mb-8 text-3xl font-bold text-blue-1">Cadastrar Novo Empreendimento</h1>
      <ErrorList errors={errors} />
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome do Empreendimento"
            customStyle="grow"
            required
          >
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome do Empreendimento"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome do Responsável"
            customStyle="grow-[4]"
          >
            <Input
              name="manager_name"
              type="text"
              value={form.manager_name}
              onChange={handleChange}
              placeholder="Nome do Responsável"
              disabled={type === 'view'}              
            />
          </Label>
          <Label
            text="Telefone do Responsável"
            customStyle="grow"
          >
            <Input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
              showMask
              disabled={type === 'view'}
            />
          </Label>
          <Label
            text="E-mail do Responsável"
            customStyle="grow"
          >
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contato@garantiaconstrutora.com.br"
              mask="contato@garantiaconstrutora.com.br"
              showMask
              disabled={type === 'view'}
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Endereço do Empreendimento"
            customStyle="grow-[5]"
            required
          >
            <Input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Endereço"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="CEP"
            customStyle="grow"
            required
          >
            <Input
              name="zip"
              type="text"
              value={form.zip}
              onChange={handleChange}
              placeholder="00000-000"
              mask="00000-000"
              showMask
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Cidade"
            customStyle="grow-[2]"
            required
          >
            <Input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Cidade"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="UF"
            customStyle="grow"
            required
          >
            <Select
              name="state"
              value={form.state}
              onChange={handleChange}
              disabled={type === 'view'}
              options={[
                { label: 'Selecione o Estado', value: '' },
                { label: 'AC', value: 'AC'},
                { label: 'AL', value: 'AL' },
                { label: 'AP', value: 'AP' },
                { label: 'AM', value: 'AM' },
                { label: 'BA', value: 'BA' },
                { label: 'CE', value: 'CE' },
                { label: 'DF', value: 'DF' },
                { label: 'ES', value: 'ES' },
                { label: 'GO', value: 'GO' },
                { label: 'MA', value: 'MA' },
                { label: 'MT', value: 'MT' },
                { label: 'MS', value: 'MS' },
                { label: 'MG', value: 'MG' },
                { label: 'PA', value: 'PA' },
                { label: 'PB', value: 'PB' },
                { label: 'PR', value: 'PR' },
                { label: 'PE', value: 'PE' },
                { label: 'PI', value: 'PI' },
                { label: 'RJ', value: 'RJ' },
                { label: 'RN', value: 'RN' },
                { label: 'RS', value: 'RS' },
                { label: 'RO', value: 'RO' },
                { label: 'RR', value: 'RR' },
                { label: 'SC', value: 'SC' },
                { label: 'SP', value: 'SP' },
                { label: 'SE', value: 'SE' },
                { label: 'TO', value: 'TO' }
              ]}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Início da Construção"
            customStyle="grow"
            required
          >
            <Input
              name="construction_date"
              type="date"
              value={form.construction_date}
              placeholder="00/00/0000"
              mask="00/00/0000"
              showMask
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Data da Entrega"
            customStyle="grow"
            required
          >
            <Input
              name="delivered_date"
              type="date"
              placeholder="00/00/0000"
              mask="00/00/0000"
              showMask
              value={form.delivered_date}
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Fim da Garantia"
            customStyle="grow"
            required
          >
            <Input
              name="warranty_date"
              type="date"
              placeholder="00/00/0000"
              mask="00/00/0000"
              showMask
              value={form.warranty_date}
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            checked={form.status}
            name="status"
            label="Empreendimento Ativo"
            disabled={type === 'view'}
            onChange={handleClick}
          />
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

export default FormBuildings;
