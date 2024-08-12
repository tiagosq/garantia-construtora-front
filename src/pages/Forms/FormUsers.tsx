import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { FaRegSave } from "react-icons/fa";
import ErrorList from "../../components/ErrorList";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { userCreateRequest, userGetRequest, userUpdateRequest } from "../../services/userServices";
import cookie from "react-cookies";

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: '',
  status: true,
};

function FormUsers({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState(defaultForm);

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
    if (form.name === '' || form.email === '' || form.phone === '' || form.password === '' || form.role === '') {
      return true;
    }
    if(!form.password || form.password.length < 6) {
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
    if(!id) {
      userCreateRequest(token, form)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário cadastrada com sucesso.',
            icon: 'success',
          }).then(() => {
            window.location.href = '/roles';
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
      userUpdateRequest(token, form, id)
      .then((data) => {
        if (data.data) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário cadastrado com sucesso.',
            icon: 'success',
          }).then(() => {
            window.location.href = '/roles';
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
      userGetRequest(token, id)
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
        {id ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
      </h1>
      ) : (
      <h1 className="mb-8 text-3xl font-bold text-blue-1">
        Visualizar Usuário
      </h1>
      )}
      <ErrorList errors={errors} />
      <form className="w-full h-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome Completo"
            customStyle="grow"
          >
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome Completo"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="E-mail"
            customStyle="grow"
          >
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contato@garantiaconstrutora.com.br"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Telefone de Contato"
            customStyle="grow"
          >
            <Input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Senha"
            customStyle="grow"
          >
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Senha"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Nível de Permissão (Função)"
            customStyle="grow"
          >
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'user', label: 'Usuário' },
              ]}
              disabled={type === 'view'}
              required
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
              label="Usuário ativo"
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

export default FormUsers;
