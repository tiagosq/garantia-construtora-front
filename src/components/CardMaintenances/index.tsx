import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

type IProps = {
  maintenance: {
    id: string;
    name: string;
    description: string;
    is_approved: string;
    is_completed: string;
    start_date: string;
    end_date: string;
  };
}

function CardMaintenances({ maintenance }: IProps) {
  let classColor = 'bg-blue-1';
  const today = new Date();
  const deadline = new Date(maintenance.end_date);
  if (today >= deadline) {
    classColor = 'bg-red-600';
  }
  if (maintenance.is_completed) {
    classColor = 'bg-green-600';
  }

  return (
    <Link to={`/dashboard/maintenance/${maintenance.id}/`}>
      <div className={`flex flex-col gap-6 min-w-72 text-white-2 px-4 py-3 my-2
      transition-all duration-150 hover:mt-0 hover:mb-4 rounded-md ${classColor}`}>
        <div>
          <h2 className="font-bold text-xl">{maintenance.name}</h2>
          <p className="text-sm">{maintenance.is_completed ? 'Concluído' : 'Pendente'}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col text-xs">
            <p>{`Início: ${maintenance.start_date}`}</p>
            <p>{`Fim: ${maintenance.end_date}`}</p>
          </div>
          <div className="flex">
            <FaLink className="text-2xl" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardMaintenances;
