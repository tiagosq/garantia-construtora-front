import { useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { FaRegSave } from "react-icons/fa";
import ErrorList from "../../components/ErrorList";
import Swal from "sweetalert2";

function FormBuildings({ type = 'view' }: { type?: 'view' | 'edit' }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    responsable: '',
    phone: '',
    address: '',
    number: '',
    cep: '',
    obs: '',
    district: '',
    city: '',
    uf: '',
    constructionDate: '',
    deliveryDate: '',
    warrantyDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value, name } } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    setForm(prevForm => ({
      ...prevForm,
      [name]: !checked
    }));
  };

  const validate = () => false;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validações aqui.
    setErrors(['Erro ao cadastrar empreendimento']);
    Swal.fire({
      title: 'Sucesso!',
      text: 'Empreendimento cadastrado com sucesso.',
      icon: 'success',
    });
  };

  return (
    <div className="w-full h-full max-w-[1000px]">
      <h1 className="mb-8 text-3xl font-bold text-blue-1">Cadastrar Novo Empreendimento</h1>
      <ErrorList errors={errors} />
      <form className="w-full h-full flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Nome do Empreendimento"
            customStyle="grow"
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
              name="responsable"
              type="text"
              value={form.responsable}
              onChange={handleChange}
              placeholder="Nome do Responsável"
              required
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
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Endereço do Empreendimento"
            customStyle="grow-[5]"
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
          <Label
            text="Número"
            customStyle="grow"
          >
            <Input
              name="number"
              type="text"
              value={form.number}
              onChange={handleChange}
              placeholder="0000"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="CEP"
            customStyle="grow"
          >
            <Input
              name="cep"
              type="text"
              value={form.cep}
              onChange={handleChange}
              placeholder="00000-000"
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Label
            text="Complemento"
            customStyle="grow-[4]"
          >
            <Input
              name="obs"
              type="text"
              value={form.obs}
              onChange={handleChange}
              placeholder="Complemento"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Bairro"
            customStyle="grow-[2]"
          >
            <Input
              name="district"
              type="text"
              value={form.district}
              onChange={handleChange}
              placeholder="Bairro"
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Cidade"
            customStyle="grow-[2]"
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
          >
            <Select
              name="uf"
              value={form.uf}
              onChange={handleChange}
              disabled={type === 'view'}
              options={[
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
          >
            <Input
              name="constructionDate"
              type="date"
              value={form.constructionDate}
              placeholder="00/00/0000"
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Data da Entrega"
            customStyle="grow"
          >
            <Input
              name="deliveryDate"
              type="date"
              placeholder="00/00/0000"
              value={form.deliveryDate}
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
          <Label
            text="Fim da Garantia"
            customStyle="grow"
          >
            <Input
              name="warrantyDate"
              type="date"
              placeholder="00/00/0000"
              value={form.warrantyDate}
              onChange={handleChange}
              disabled={type === 'view'}
              required
            />
          </Label>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            checked={false}
            name="active"
            label="Empreendimento Ativo"
            disabled={type === 'view'}
            onClick={handleClick}
          />
        </div>
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
      </form>
    </div>
  )
}

export default FormBuildings;
