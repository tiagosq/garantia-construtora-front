import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegEdit, FaRegFile, FaRegTrashAlt } from "react-icons/fa";
import Table from "../components/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { businessDeleteRequest, businessSearchRequest } from "../services/businessServices";
import cookie from "react-cookies";
import { formatCNPJ } from "../utils/format";
import { HashLoader } from "react-spinners";
import { AppContext } from "../context/AppContext";

function Business() {
  const [form, setForm] = useState<{ name: string; }>({ name: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sort, setSort] = useState({ column: 'name', order: 'asc'});
  const [data, setData] = useState<{
    last_page: number;
    data: { 
      [key: string]: string | number | React.ReactNode; 
    }[] 
  }>({ last_page: 0, data: [] });

  const search = () => {
    setIsLoading(true);
    const token = cookie.load('GC_JWT_AUTH');
    const filters = [];
    if(form.name) filters.push(`name-search=${form.name}`);
    businessSearchRequest(token, page, limit, sort, filters).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setPage(1);
    search();
  }, [page, limit, sort]);

  const { userData } = useContext(AppContext);
  const writePermission = userData.data?.role.permissions.business.create;
  const updatePermission = userData.data?.role.permissions.business.update;
  const deletePermission = userData.data?.role.permissions.business.delete;

  useEffect(() => {
    if (userData.data) {
      const permissions = userData.data.role.permissions.business;
      if (!permissions.read) {
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

  const actions = (id: string) => (
    <div className="inline-flex gap-2 items-center">
      <FaRegFile onClick={() => navigate(`/business/${id}/view`)} />
      {updatePermission && (<FaRegEdit onClick={() => navigate(`/business/${id}/edit`)} />)}
      {deletePermission && (<FaRegTrashAlt 
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
      />)}
    </div>
  );

  const parsedData = {
    last_page: data.last_page,
    data: data.data.map((item) => {
      return {
        ...item,
        cnpj: formatCNPJ(item.cnpj as string),
        status: item.status ? 'Ativo' : 'Inativo',
        actions: actions(item.id as string),
      }
    })
  };
  

  return (
    <div className="w-full min-h-full flex flex-col gap-4">
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">
        Empresas
      </h1>
      {writePermission && (
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
      )}
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
          onClick={search}
          text={
          <span className="inline-flex items-center gap-1 mt-px">
            <IoSearchOutline className="text-xl" />
            Pesquisar
          </span>
          }
          customStyle="!bg-blue-2 !h-10 text-sm"
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
            { name: 'CNPJ', column: 'cnpj', sortable: true },
            { name: 'Nome', column: 'name', sortable: true },
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
        )}
      </div>
    </div>
  )
}

export default Business;