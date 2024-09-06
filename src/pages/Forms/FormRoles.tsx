import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { FaRegSave } from "react-icons/fa";
import ErrorList from "../../components/ErrorList";
import Swal from "sweetalert2";
import { roleCreateRequest, roleGetRequest, roleUpdateRequest } from "../../services/rolesServices";
import cookie from "react-cookies";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

type IForm = {
  name: string;
  management: boolean;
  status: boolean;
  permissions: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
};

const defaultForm: IForm = {
  name: '',
  management: false,
  status: true,
  permissions: {
    attachment: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    building: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    business: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    log: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    maintenance: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    question: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    role: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    user: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  },
};

function FormRoles({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const { id } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [form, setForm] = useState<IForm>(defaultForm);
  const navigate = useNavigate();

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

  const handlePermissions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const [module, action] = name.split('-');
    setForm(prevForm => ({
      ...prevForm,
      permissions: {
        ...prevForm.permissions,
        [module]: {
          ...prevForm.permissions[module],
          [action]: !prevForm.permissions[module][action],
        },
      },
    }));
  };

  const validate = () => {
    if (!form.name) {
      return true;
    }
    return false;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    if (!form.name) {
      errors.push('Preencha todos os campos obrigatórios');
    }
    setErrors(errors);
    const token = cookie.load('GC_JWT_AUTH');
    const response = {
      name: form.name,
      management: form.management,
      status: form.status,
      permissions: JSON.stringify(form.permissions),
    };
    if(!id) {
      roleCreateRequest(token, response)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Função cadastrada com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/roles');
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
      roleUpdateRequest(token, response, id)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Função cadastrada com sucesso.',
            icon: 'success',
          }).then(() => {
            navigate('/roles');
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
      roleGetRequest(token, id)
      .then((data) => {
        const permissions = JSON.parse(data.data.permissions);
        setForm({
          ...data.data,
          permissions,
        });
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setForm(defaultForm);
    }
  }, [id]);

  const pagesMap: { [key: string]: string } = {
    attachment: 'Anexos',
    building: 'Empreendimentos',
    business: 'Negócios',
    log: 'Logs',
    maintenance: 'Manutenções',
    question: 'Perguntas',
    role: 'Funções',
    user: 'Usuários',
  };

  const actionsMap: { [key: string]: string } = {
    create: 'Criar',
    read: 'Ler',
    update: 'Atualizar',
    delete: 'Deletar',
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
      {type === 'edit' ? (
      <h1 className="mb-8 text-3xl font-bold text-blue-1">
        {id ? 'Editar Função' : 'Cadastrar Nova Função'}
      </h1>
      ) : (
      <h1 className="mb-8 text-3xl font-bold text-blue-1">
        Visualizar Função
      </h1>
      )}
      <ErrorList errors={errors} />
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome da Função"
            customStyle="grow"
          >
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome do Função"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            checked={form.status}
            name="active"
            label="Função Ativa"
            disabled={type === 'view'}
            onChange={handleClick}
          />
          <Checkbox
            checked={form.management}
            name="active"
            label="Função de Gerenciamento (Apenas para Administradores)"
            disabled={type === 'view'}
            onChange={handleClick}
          />
        </div>
        <div className="flex flex-col flex-wrap gap-4">
          <h2 className="text-typo-primary text-xl mt-4 font-bold">Resumo das Permissões</h2>
          <div className="flex flex-col gap-4">
            {Object.keys(form.permissions).map(module => (
              <div key={module} className="flex flex-col flex-wrap gap-2">
                <h3 className="text-typo-primary font-semibold">{pagesMap[module]}</h3>
                <div className="flex justify-start gap-4">
                  {Object.keys(form.permissions[module]).map(action => (
                    <Checkbox
                      key={action}
                      checked={form.permissions[module][action]}
                      name={`${module}-${action}`}
                      label={actionsMap[action]}
                      disabled={type === 'view'}
                      onChange={handlePermissions}
                      customStyle="text-xs !w-auto"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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

export default FormRoles;
