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
import { formatPhoneNumber } from "../utils/format";
import { userSearchRequest } from "../services/userServices";
import cookie from "react-cookies";
import { HashLoader } from "react-spinners";

function Business() {
  const [form, setForm] = useState<{ email: string; }>({ email: '' });
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    const token = cookie.load('GC_JWT_AUTH');
    userSearchRequest(token, page, limit).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  }, [page, limit, sort]);

  const actions = (id: string) => (
    <div className="inline-flex gap-2 items-center">
      <FaRegFile onClick={() => navigate(`/users/${id}/view`)} />
      <FaRegEdit onClick={() => navigate(`/users/${id}/edit`)} />
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
      phone: formatPhoneNumber(item.phone as string),
      status: item.status ? 'Ativo' : 'Inativo',
      actions: actions(item.id as string),
    }))
  };

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
        {isLoading ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <HashLoader color="#0078d4" />
          </div>
        ) : (
        <Table
          headers={[
            { name: 'Usuário', column: 'email', sortable: true },
            { name: 'Nome', column: 'fullname', sortable: true },
            { name: 'Função', column: 'role' },
            { name: 'Criado em', column: 'created_at', sortable: true },
            { name: 'Status', column: 'status' },
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
        )}
      </div>
    </div>
  )
}

export default Business;