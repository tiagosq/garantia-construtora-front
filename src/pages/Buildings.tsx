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
import { HashLoader } from "react-spinners";
import { businessDeleteRequest } from "../services/businessServices";
import cookie from "react-cookies";

function Buildings() {
  const [form, setForm] = useState<{ name: string; }>({ name: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const actions = (id: string) => (
    <div className="inline-flex gap-2 items-center">
      <FaRegFile onClick={() => navigate(`/roles/${id}/view`)} />
      <FaRegEdit onClick={() => navigate(`/roles/${id}/edit`)} />
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
              businessDeleteRequest(cookie.load('GC_JWT_AUTH'), id).then(() => {
                Swal.fire({
                  title: 'Excluído!',
                  text: 'O registro foi excluído.',
                  icon: 'success',
                }).then(() => {
                  setData({
                    last_page: data.last_page,
                    data: data.data.filter((item) => item.id !== id)
                  });
                }).catch(() => {
                  Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao excluir o registro.',
                    icon: 'error',
                  });
                });
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
        Empreendimentos
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

      <div className="w-full flex flex-wrap justify-start items-end gap-4">
        <Label text="Usuário" customStyle="grow md:grow-0 min-w-96">
          <Input
            type="text"
            name="Nome do Empreendimento"
            placeholder="Nome do Empreendimento"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
        </Label>
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
        {isLoading ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <HashLoader color="#0078d4" />
          </div>
        ) : (
          <Table
            headers={[
              { name: 'Usuário', column: 'user', sortable: true },
              { name: 'Data', column: 'date', sortable: true },
              { name: 'Ação', column: 'action' },
              { name: 'Status', column: 'status' },
              { name: 'Ações', column: 'actions' },
            ]}
            data={parsedData}
          />
        )}
      </div>
    </div>
  )
}

export default Buildings;