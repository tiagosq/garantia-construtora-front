import { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileCsv, FaRegEdit, FaRegFile, FaRegTrashAlt } from "react-icons/fa";
import Table from "../components/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

function Business() {
  const [form, setForm] = useState<{ email: string; }>({ email: '' });
  const navigate = useNavigate();

  const actions = (
    <div className="inline-flex gap-2 items-center">
      <FaRegFile />
      <FaRegEdit />
      <FaRegTrashAlt 
        className="text-red-600" 
        onClick={
          () => Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação não poderá ser desfeita!', 
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#CC3333',
            cancelButtonColor: '#333',
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Excluído!',
                text: 'O registro foi excluído.',
                icon: 'success',
              });
            }
          })
        } 
      />
    </div>
  );

  

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">
        Usuários
      </h1>
      <Button
        type="button"
        onClick={() => navigate('/users/create')}
        customStyle="!px-4 !py-1"
        text={(
          <span className="inline-flex items-center gap-2">
            <FaPlus className="mb-px" /> Novo
          </span>
        )}
      />
      </div>

      <div className="w-full flex flex-wrap justify-start items-end gap-4">
        <Label text="E-mail" customStyle="grow md:grow-0 min-w-96">
          <Input
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </Label>
        <Button
          type="button"
          text={
          <span className="inline-flex items-center gap-1 mt-px">
            <FaFileCsv className="text-xl" />
            Gerar CSV
          </span>
          }
          customStyle="!bg-green-600 !h-10 text-sm"
          onClick={() => console.log(form)}
        />
        <Button
          type="button"
          text={
          <span className="inline-flex items-center gap-1 mt-px">
            <IoSearchOutline className="text-xl" />
            Pesquisar
          </span>
          }
          customStyle="!bg-blue-2 !h-10 text-sm"
          onClick={() => console.log(form)}
        />
      </div>
      <div>
        <Table
          headers={[
            { name: 'Usuário', column: 'user', sortable: true },
            { name: 'Função', column: 'role' },
            { name: 'Criado em', column: 'date', sortable: true },
            { name: 'Status', column: 'status' },
            { name: 'Ações', column: 'actions' },
          ]}
          data={[
            { user: 'Admin', role: 'Administrador', date: '01/01/2021', status: 'Ativo', actions },
          ]}
        />
      </div>
    </div>
  )
}

export default Business;