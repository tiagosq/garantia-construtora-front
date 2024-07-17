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

function Roles() {
  const [form, setForm] = useState<{ name: string; }>({ name: '' });
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
        Funções
      </h1>
      <Button
        type="button"
        onClick={() => navigate('/buildings/create')}
        customStyle="!px-4 !py-1"
        text={(
          <span className="inline-flex items-center gap-2">
            <FaPlus className="mb-px" /> Novo
          </span>
        )}
      />
      </div>
      <div>
        <Table
          headers={[
            { name: 'Função', column: 'role', sortable: true },
            { name: 'Ações', column: 'actions' },
          ]}
          data={[
            { role: 'Administrador', actions },
            { role: 'Usuário', actions },
            { role: 'Convidado', actions },
          ]}
        />
      </div>
    </div>
  )
}

export default Roles;