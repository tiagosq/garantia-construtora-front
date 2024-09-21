import { FaCalendarAlt } from "react-icons/fa"
import Card from "../components/Card"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { buildingSearchRequest } from "../services/buildingsServices";
import cookie from "react-cookies";

function Dashboard() {
  const { userData } = useContext(AppContext);
  const [buildings, setBuildings] = useState([]);
  
  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    if(!userData?.data?.business?.id) return;
    buildingSearchRequest(token, userData.data.business.id)
    .then((res) => {
      setBuildings(res.data.data);
    });
  }, [userData]);

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl text-typo-primary">Olá,&nbsp; 
        <span className="text-blue-1 font-bold">
          { userData?.data?.fullname.split(' ')[0] || '' }
        </span>
      </h1>
      { userData?.data?.business?.id && (
      <div className="flex flex-col mt-12">
        <div className="inline-flex items-baseline gap-2 font-bold text-xl text-primary dark:text-typo-primary mb-4">
          <FaCalendarAlt className="text-typo-primary" />
          <span className="text-typo-primary">Próximas conferências (30 dias)</span>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-4">
          { buildings.map((building: { id: string, name: string, city: string, state: string, manager_name: string, phone: string }) => (
            <Card key={building.id} building={building} />
          )) }
        </div>
      </div>
      )}
    </div>
  )
}

export default Dashboard