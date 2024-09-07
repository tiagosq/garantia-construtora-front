import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

type IProps = {
  building: {
    id: string;
    name: string;
    city: string;
    state: string;
    manager_name: string;
    phone: string;
  };
}

function Card({ building }: IProps) {
  const classColor = 'bg-blue-1';
  /* const today = new Date();
  const deadline = new Date(maintenance.deadline);
  if (today >= deadline) {
    classColor = 'bg-red-600';
  }
  if (maintenance.questions === maintenance.answered) {
    classColor = 'bg-green-600';
  } */

  return (
    <Link to={`/dashboard/${building.id}/`}>
      <div className={`flex flex-col gap-6 min-w-72 text-white-2 px-4 py-3 my-2
      transition-all duration-150 hover:mt-0 hover:mb-4 rounded-md ${classColor}`}>
        <div>
          <h2 className="font-bold text-xl">{building.name}</h2>
          <p className="text-sm">{`${building.city}/${building.state}`}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col text-xs">
            <p>{`Responsável: ${building.manager_name}`}</p>
            <p>{building.phone}</p>
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
