import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaBriefcase, FaRegCheckCircle, FaRegUserCircle } from "react-icons/fa";
import { FaClipboardUser, FaGear } from "react-icons/fa6";
import { MdAccessTime, MdAutoAwesomeMosaic, MdExitToApp } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";

function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full min-h-screen flex justify-between items-stretch">
      <nav className="min-h-full bg-blue-1 flex flex-col px-6 py-24 relative">
        <ul className="flex flex-col gap-4 text-primary relative-z-20">
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/dashboard" className="flex gap-4 items-center justify-start">
              <MdAutoAwesomeMosaic className="text-2xl" />
              {isOpen && <span className="text-lg">Início</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/maintenance" className="flex gap-4 items-center justify-start">
              <FaRegCheckCircle className="text-2xl" />
              {isOpen && <span className="text-lg">Manutenções</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/buildings" className="flex gap-4 items-center justify-start">
              <PiBuildingApartmentFill className="text-2xl" />
              {isOpen && <span className="text-lg">Empreendimentos</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/business" className="flex gap-4 items-center justify-start">
              <FaBriefcase className="text-2xl" />
              {isOpen && <span className="text-lg">Empresa</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/users" className="flex gap-4 items-center justify-start">
              <FaRegUserCircle className="text-2xl" />
              {isOpen && <span className="text-lg">Usuários</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/roles" className="flex gap-4 items-center justify-start">
              <FaClipboardUser className="text-2xl" />
              {isOpen && <span className="text-lg">Funções</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/users" className="flex gap-4 items-center justify-start">
              <MdAccessTime className="text-2xl" />
              {isOpen && <span className="text-lg">Histórico</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/settings" className="flex gap-4 items-center justify-start">
              <FaGear className="text-2xl" />
              {isOpen && <span className="text-lg">Configurações</span>}
            </Link>
          </li>
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/logout" className="flex gap-4 items-center justify-start">
              <MdExitToApp className="text-2xl" />
              {isOpen && <span className="text-lg">Sair</span>}
            </Link>
          </li>
        </ul>
        <div
          className="absolute bottom-10 -right-10 z-10 text-primary text-2xl bg-blue-2 p-2 rounded-tr-md rounded-br-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </div>
      </nav>
      <div className="w-full min-h-full grow bg-secondary p-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Menu;