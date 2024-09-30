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
import { HashLoader } from "react-spinners";
import cookie from "react-cookies";
import { buildingDeleteRequest, buildingSearchRequest } from "../services/buildingsServices";
import { AppContext } from "../context/AppContext";

function Buildings() {
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

  const { userData } = useContext(AppContext);
  const writePermission = userData.data?.role.permissions.building.create;
  const updatePermission = userData.data?.role.permissions.building.update;
  const deletePermission = userData.data?.role.permissions.building.delete;

  useEffect(() => {
    if (userData.data) {
      const permissions = userData.data.role.permissions.building;
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
      <FaRegFile onClick={() => navigate(`/buildings/${id}/view`)} />
      {updatePermission && (<FaRegEdit onClick={() => navigate(`/buildings/${id}/edit`)} />)}
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
              buildingDeleteRequest(cookie.load('GC_JWT_AUTH'), id).then(() => {
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
        status: item.status ? 'Ativo' : 'Inativo',
        actions: actions(item.id as string),
      }
    })
  };

  const search = () => {
    setIsLoading(true);
    const token = cookie.load('GC_JWT_AUTH');
    if(!userData?.data?.business?.id) return;
    const filters = [];
    if(form.name) filters.push(`name-search=${form.name}`);
    buildingSearchRequest(token, userData.data.business.id, page, limit, sort, filters).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    setPage(1);
    search();
  }, [page, limit, sort]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">
        Empreendimentos
      </h1>
      {writePermission && (
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
      )}
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
          onClick={search}
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
              { name: 'Empreendimento', column: 'name', sortable: true },
              { name: 'Cidade', column: 'city', sortable: true },
              { name: 'Estado', column: 'state' },
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

export default Buildings;