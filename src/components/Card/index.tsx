import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

type IProps = {
  building: {
    id: number;
    name: string;
  };
  maintenance: {
    id: number;
    title: string;
    deadline: string;
    questions: number;
    answered: number;
  };
}

function Card({ building, maintenance }: IProps) {
  let classColor = 'bg-blue-1';
  const today = new Date();
  const deadline = new Date(maintenance.deadline);
  if (today >= deadline) {
    classColor = 'bg-red-600';
  }
  if (maintenance.questions === maintenance.answered) {
    classColor = 'bg-green-600';
  }

  return (
    <Link to={`/maintenance/${building.id}/${maintenance.id}`}>
      <div className={`flex flex-col gap-6 min-w-72 text-white-2 px-4 py-3 my-2
      transition-all duration-150 hover:mt-0 hover:mb-4 rounded-md ${classColor}`}>
        <div>
          <h2 className="font-bold text-xl">{building.name}</h2>
          <p className="text-sm">{maintenance.title}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col text-xs">
            <p>{`${maintenance.answered} de ${maintenance.questions} itens`}</p>
            <p>Prazo {maintenance.deadline}</p>
          </div>
          <div className="flex">
            <FaLink className="text-2xl" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;
