import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaRegEdit, FaRegFile, FaRegTrashAlt } from "react-icons/fa";
import Table from "../components/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { roleSearchRequest } from "../services/rolesServices";
import cookie from "react-cookies";
import { HashLoader } from "react-spinners";

function Roles() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
    roleSearchRequest(token, page, limit).then((data) => {
      setData(data.data);
      setIsLoading(false);
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
      status: item.status === 1 ? 'Ativo' : 'Inativo',
      actions: actions(item.id as string),
    }))
  };

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
        {isLoading ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <HashLoader color="#0078d4" />
          </div>
        ) : (
        <Table
          headers={[
            { name: 'Função', column: 'name', sortable: true },
            { name: 'Ações', column: 'actions' },
          ]}
          data={parsedData}
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          setSort={setSort}
          sort={sort}
        />
        )}
      </div>
    </div>
  )
}

export default Roles;