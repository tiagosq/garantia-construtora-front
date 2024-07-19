import { useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileCsv } from "react-icons/fa";
import Table from "../components/Table";
import cookie from "react-cookies";
import { logRequest } from "../services/logsServices";
import { HashLoader } from "react-spinners";

function Logs() {
  const [form, setForm] = useState<{ email: string; startDate: string; endDate: string; }>({ email: '', startDate: '', endDate: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
    logRequest(token, page, limit).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  }, [page, limit, sort]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-3xl text-blue-1 font-bold">Histórico</h1>
      <div className="w-full flex flex-wrap justify-start items-end gap-4">
        <Label text="Usuário" customStyle="grow md:grow-0">
          <Input
            type="text"
            name="user"
            placeholder="E-mail do Usuário"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </Label>
        <Label text="Data Inicial" customStyle="grow md:grow-0">
          <Input
            type="date"
            name="startDate"
            placeholder="Início"
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            value={form.startDate}
          />
        </Label>
        <Label text="Data Final" customStyle="grow md:grow-0">
          <Input
            type="date"
            name="endDate"
            placeholder="Fim"
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            value={form.endDate}
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
            { name: 'Data', column: 'created_at' },
            { name: 'Usuário', column: 'user', sortable: true },
            { name: 'Endereço IP', column: 'ip' },
            { name: 'Ação', column: 'action' }
          ]}
          data={data}
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

export default Logs;