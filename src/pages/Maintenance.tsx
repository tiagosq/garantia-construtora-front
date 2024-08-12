import { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileCsv } from "react-icons/fa";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { HashLoader } from "react-spinners";

function Maintenance() {
  const [form, setForm] = useState<{ name: string; }>({ name: '' });
  const [isLoading] = useState(true);
  const navigate = useNavigate();  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sort, setSort] = useState({ column: '', order: ''});

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">
        Manutenções
      </h1>
      <Button
        type="button"
        onClick={() => navigate('/maintenance/create')}
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
              { name: 'Usuário', column: 'user', sortable: true },
              { name: 'Data', column: 'date', sortable: true },
              { name: 'Ação', column: 'action' },
              { name: 'Status', column: 'status' },
              { name: 'Ações', column: 'actions' },
            ]}
            data={{
              last_page: 1,
              data: [],
            }}
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

export default Maintenance;