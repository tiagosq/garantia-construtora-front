import { useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileCsv, FaRegEdit, FaRegFile, FaRegTrashAlt } from "react-icons/fa";
import Table from "../components/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { businessSearchRequest } from "../services/businessServices";
import cookie from "react-cookies";

function Business() {
  const [form, setForm] = useState<{ name: string; }>({ name: '' });
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sort, setSort] = useState({ column: '', order: ''});
  const [data, setData] = useState<{
    last_page: number;
    data: { 
      [key: string]: string | number | React.ReactNode; 
    }[] 
  }>({ last_page: 0, data: [] });

  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    businessSearchRequest(token, page, limit).then((data) => {
      setData(data.data);
    });
  }, [page, limit, sort]);

  const actions = (id: string) => (
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

  const parsedData = {
    last_page: data.last_page,
    data: data.data.map((item) => ({
      ...item,
      cnpj: item.cnpj ? item.cnpj.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : item.cnpj,
      status: item.status === 1 ? 'Ativo' : 'Inativo',
      actions: actions(item.id as string),
    }))
  };
  

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">
        Empresas
      </h1>
      <Button
        type="button"
        onClick={() => navigate('/business/create')}
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
            name="Nome da Empresa"
            placeholder="Nome da Empresa"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
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
            { name: 'CNPJ', column: 'user', sortable: true },
            { name: 'Nome', column: 'date', sortable: true },
            { name: 'E-mail', column: 'email', sortable: true },
            { name: 'Cidade', column: 'city', sortable: true },
            { name: 'Estado', column: 'state' },
            { name: 'status', column: 'status' },
            { name: 'Ações', column: 'actions' },
          ]}
          data={parsedData}
          limit={limit}
          page={page}
          sort={sort}
          setLimit={setLimit}
          setPage={setPage}
          setSort={setSort}
        />
      </div>
    </div>
  )
}

export default Business;