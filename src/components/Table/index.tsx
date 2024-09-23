import { FaArrowLeft, FaArrowRight, FaRegSadCry, FaSortDown, FaSortUp } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import Select from "../Select";
import moment, { MomentInput } from "moment";

type IProps = {
  headers: {
    name: string;
    column: string;
    sortable?: boolean;
  }[];
  data: {
    last_page: number;
    data: {
      [key: string]: string | number | React.ReactNode;
    }[],
  };
  limit: number;
  page: number;
  sort: {
    column: string;
    order: string;
  };
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  setSort: (sort: { column: string; order: string; }) => void;
};

function Table({ headers, data, limit, page, sort, setLimit, setPage, setSort }: IProps) {
  const dateColumns = ['created_at', 'updated_at', 'deleted_at'];
  return (
    <div className="w-full">
      {data.data?.length > 0 ? (
      <div className="w-full flex flex-col justify-end items-end gap-4">
        <div className="w-full overflow-x-auto">
          <table className="w-full overflow-x-auto" width="100%">
            <thead className="bg-blue-2">
              <tr>
              {headers.map((header, index) => (
                <th
                  key={`header-${index}`}
                  className="!text-gray-50 font-bold text-sm text-left py-2 px-3 cursor-pointer"
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
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr key={`line-${index}`} className="even:bg-blue-2 even:bg-opacity-10 dark:bg-primary 
                hover:bg-opacity-30 hover:bg-blue-2 transition-all duration-150 cursor-pointer">
                  {headers.map((header, icol) => (
                    <td
                      key={`cell-${icol}-${index}`} 
                      className={`text-typo-primary text-sm text-left py-1 px-3
                        ${header.column === 'status' && (item[header.column]?.toString().toLowerCase() === 'ativo' ? '!text-green-600' : '!text-red-600')}`}
                    >
                      {dateColumns.includes(header.column) 
                        ? moment(item[header.column] as MomentInput).format('YYYY/MM/DD HH:mm:ss')
                        : item[header.column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 flex-wrap justify-end">
          {data.last_page > 1 && (
          <div className="flex gap-0.5 justify-center items-center">
            <div
              className={`cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1 rounded-tl rounded-bl
              ${page === 1 && 'brightness-125 saturate-150'}`}
              onClick={() => setPage(1)}
            >
              1
            </div>
            {page > 3 && (
            <div className={`cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1`}>...</div>
            )}
            {Array.from({ length: data.last_page }, (_, i) => i + 1)
              .filter((item) => item >= page - 2 && item <= page + 2 && item > 1 && item < data.last_page)
              .map((item) => (
                <div
                  className={`cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1
                  ${page === item && 'brightness-125 saturate-150'}`}
                  key={`page-${item}`}
                  onClick={page !== item ? () => setPage(item) : undefined}
                >
                  {item}
                </div>
              ))}
            {data.last_page > 5 && (
              <>
                <div className={`cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1 grayscale-50`}>...</div>
                <div
                  className={`cursor-pointer hover:brightness-125 w-10 h-10 flex justify-center items-center bg-blue-2 text-white-1 rounded-tr rounded-br
                  ${page === data.last_page && 'brightness-125 saturate-150'}`}
                  onClick={() => setPage(data.last_page)}
                >
                  {data.last_page}
                </div>
              </>
            )}
          </div>
          )}
          <div className="flex items-center justify-end gap-2">
            <span className="text-typo-secondary text-sm font-bold whitespace-nowrap">Resultados por página:</span>
            <Select
              name="limit"
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
