import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegSadCry, FaSortDown, FaSortUp } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import Select from "../Select";

type IProps = {
  headers: {
    name: string;
    column: string;
    sortable?: boolean;
  }[];
  data: {
    [key: string]: string | number | React.ReactNode;
  }[];
};

function Table({ headers, data }: IProps) {
  const [sort, setSort] = useState({ column: '', order: ''});
  const [limit, setLimit] = useState(25);

  return (
    <div className="w-full">
      {data.length > 0 ? (
      <div className="w-full flex flex-col justify-end items-end gap-4">
        <div className="w-full">
          <table className="w-full overflow-x-auto" width="100%">
            <thead className="bg-blue-2">
              {headers.map((header) => (
                <th
                  key={header.column}
                  className="!text-gray-50 font-bold text-sm text-left py-2 px-4 cursor-pointer"
                  onClick={() => {
                    if (sort.column === header.column) {
                      setSort({
                        column: header.column,
                        order: sort.order === 'asc' ? 'desc' : 'asc'
                      });
                    } else {
                      setSort({
                        column: header.column,
                        order: 'asc'
                      });
                    }
                  }}
                >
                  {header.name}
                  {header.sortable && (
                    <>
                      {sort.column !== header.column && <FaSort className="inline ml-1" />}
                      {sort.column === header.column && sort.order === 'asc' && <FaSortUp className="inline ml-1" />}
                      {sort.column === header.column && sort.order === 'desc' && <FaSortDown className="inline ml-1" />}
                    </>
                  )}
                </th>
              ))}
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-blue-2 even:bg-opacity-10 dark:bg-primary 
                hover:bg-opacity-30 hover:bg-blue-2 transition-all duration-150 cursor-pointer">
                  {headers.map((header) => (
                    <td
                      key={`${header.column}-${index}`} 
                      className={`text-typo-primary text-sm text-left py-2 px-4
                        ${header.column === 'status' && (item[header.column]?.toString().toLowerCase() === 'ativo' ? '!text-green-600' : '!text-red-600')}`}
                    >
                      {item[header.column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 flex-wrap justify-end">
          <div className="flex gap-0.5 justify-center items-center">
            <div className="cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1 rounded-tl rounded-bl">
              <FaArrowLeft />
            </div>
            <div className="cursor-pointer brightness-125 saturate-150 hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1">
              1
            </div>
            <div className="cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1">
              2
            </div>
            <div className="cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1">
              3
            </div>
            <div className="cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1">
              4
            </div>
            <div className="cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1 rounded-tr rounded-br">
              <FaArrowRight />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-typo-secondary text-sm font-bold whitespace-nowrap">Resultados por página:</span>
            <Select
              options={[
                { value: '25', label: '25' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
              ]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(parseInt(e.target.value))}
              value={limit.toString()}
            />
          </div>
        </div>
      </div>
      ) : (
        <div className="w-full min-h-96 flex flex-col justify-center items-center gap-4">
          <FaRegSadCry className="text-9xl text-blue-2 text-opacity-50" />
          <span className="text-2xl text-typo-secondary text-opacity-30 italic">Nenhum resultado foi encontrado.</span>
        </div>
      )}
    </div>
  )
}

export default Table;
