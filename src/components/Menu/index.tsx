import { useContext, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaBriefcase, FaRegCheckCircle, FaRegMoon, FaRegUserCircle } from "react-icons/fa";
import { FaClipboardUser, FaGear } from "react-icons/fa6";
import { MdAccessTime, MdAutoAwesomeMosaic, MdExitToApp, MdOutlineWbSunny } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Menu() {
  const { isDark, toggleTheme, isOpen, toggleMenu, loadUserData, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const isManager = !userData?.data?.business?.id;

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="w-full min-w-40 min-h-screen flex justify-between items-stretch relative">
      <nav className="min-h-full bg-blue-1 flex flex-col px-6 py-24 lg:relative fixed">
        <ul className="flex flex-col gap-4 text-primary dark:text-typo-primary relative-z-20">
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/dashboard" className="flex gap-4 items-center justify-start">
              <MdAutoAwesomeMosaic className="text-2xl" />
              {isOpen && <span className="text-lg">Início</span>}
            </Link>
          </li>
          {!isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/maintenance" className="flex gap-4 items-center justify-start">
              <FaRegCheckCircle className="text-2xl" />
              {isOpen && <span className="text-lg">Manutenções</span>}
            </Link>
          </li>
          )}
          {!isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/buildings" className="flex gap-4 items-center justify-start">
              <PiBuildingApartmentFill className="text-2xl" />
              {isOpen && <span className="text-lg">Empreendimentos</span>}
            </Link>
          </li>
          )}
          {isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/business" className="flex gap-4 items-center justify-start">
              <FaBriefcase className="text-2xl" />
              {isOpen && <span className="text-lg">Empresas</span>}
            </Link>
          </li>
          )}
          {isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/users" className="flex gap-4 items-center justify-start">
              <FaRegUserCircle className="text-2xl" />
              {isOpen && <span className="text-lg">Usuários</span>}
            </Link>
          </li>
          )}
          {isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/roles" className="flex gap-4 items-center justify-start">
              <FaClipboardUser className="text-2xl" />
              {isOpen && <span className="text-lg">Funções</span>}
            </Link>
          </li>
          )}
          {isManager && (
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/logs" className="flex gap-4 items-center justify-start">
              <MdAccessTime className="text-2xl" />
              {isOpen && <span className="text-lg">Histórico</span>}
            </Link>
          </li>
          )}
          <li className="cursor-pointer py-1 hover:pt-0 hover:pb-2 transition-all duration-150">
            <Link to="/settings" className="flex gap-4 items-center justify-start">
              <FaGear className="text-2xl" />
              {isOpen && <span className="text-lg">Perfil</span>}
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
          className="absolute bottom-10 -right-10 z-10 text-white-1 text-2xl bg-blue-2 p-2 rounded-tr-md rounded-br-md"
          onClick={toggleMenu}
        >
          {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </div>
      </nav>
      <div className="flex flex-col w-full min-h-full grow bg-secondary pl-24 p-4 lg:p-10">
        <div className="w-full flex justify-end">
          <div
            className="text-blue-2 text-xl cursor-pointer p-2 hover:pt-0 hover:pb-4 transition-all duration-150"
            onClick={toggleTheme}
          >
            {isDark ? (<FaRegMoon />) : (<MdOutlineWbSunny />)}
          </div>
          <div
            className="text-blue-2 text-xl cursor-pointer p-2 hover:pt-0 hover:pb-4 transition-all duration-150"
            onClick={() => navigate('/logout')}
          >
            <MdExitToApp />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Menu;