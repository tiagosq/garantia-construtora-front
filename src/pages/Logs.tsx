import { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileCsv, FaRegEdit, FaRegFile, FaRegTrashAlt } from "react-icons/fa";
import Table from "../components/Table";

function Logs() {
  const [form, setForm] = useState<{ email: string; startDate: string; endDate: string; }>({ email: '', startDate: '', endDate: '' });

  const actions = (
    <div className="inline-flex gap-2 items-center">
      <FaRegFile />
      <FaRegEdit />
      <FaRegTrashAlt className="text-red-600" />
    </div>
  );

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
        <Table
          headers={[
            { name: 'Usuário', column: 'user', sortable: true },
            { name: 'Data', column: 'date', sortable: true },
            { name: 'Ação', column: 'action' },
            { name: 'Status', column: 'status' },
            { name: 'Ações', column: 'actions' },
          ]}
          data={[
            { user: '1', date: '2', action: '3', status: 'Ativo', actions },
            { user: '4', date: '5', action: '6', status: 'Ativo', actions },
            { user: '7', date: '8', action: '9', status: 'Inativo', actions },
          ]}
        />
      </div>
    </div>
  )
}

export default Logs;