import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import cookie from "react-cookies";
import { useNavigate, useParams } from "react-router-dom";
import { maintenanceGetRequest } from "../services/maintenanceServices";
import CardMaintenances from "../components/CardMaintenances";
import { HashLoader } from "react-spinners";
import { buildingGetRequest } from "../services/buildingsServices";
import { IMaintenanceData } from "../types/types";

function DashboardBuildings() {
  const { userData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenances, setMaintenances] = useState([]);
  const [building, setBuilding] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    if(!userData?.data?.business?.id) return;
    if(id) {
      maintenanceGetRequest(token, userData.data.business.id, id)
      .then((res) => {
        const parsedData = res.data.data.map((maintenance: IMaintenanceData) => ({
          ...maintenance,
          end_date: new Date(maintenance.end_date).toLocaleDateString(),
          start_date: new Date(maintenance.start_date).toLocaleDateString(),
          is_completed: maintenance.is_completed === 'true',
          is_approved: maintenance.is_approved === 'true',
        }));
        setMaintenances(parsedData);
        setIsLoading(false);
      });

      buildingGetRequest(token, id, userData.data.business.id)
      .then((res) => {
        setBuilding(res.data.name);
      });
    }
  }, [userData, id]);

  return (
    <div className="w-full h-full">
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-1 cursor-pointer mb-4">
        <FaArrowLeft className="text-2xl text-blue-1" /> Voltar
      </div>
      <h1 className="text-4xl text-typo-primary">Visão geral:&nbsp; 
        <span className="text-blue-1 font-bold">
          { building || '' }
        </span>
      </h1>
      { userData?.data?.business?.id && (
      <div className="flex flex-col mt-12">
        <div className="inline-flex items-baseline gap-2 font-bold text-xl text-primary dark:text-typo-primary mb-4">
          <FaCalendarAlt className="text-typo-primary" />
          <span className="text-typo-primary">Manutenções e Conferências</span>
        </div>
        {!isLoading ? (
          <div className="flex items-center justify-start flex-wrap gap-4">
            {maintenances.length > 0 ? maintenances.map((maintenance, i) => (
              <CardMaintenances key={i} maintenance={maintenance} />
            )) : (
              <p className="text-typo-primary dark:text-typo-primary">Nenhuma manutenção ou conferência agendada.</p>
            )}
          </div>
        ) : (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <HashLoader color="#0078d4" />
          </div>
        )}
      </div>
      )}
    </div>
  )
}

export default DashboardBuildings;