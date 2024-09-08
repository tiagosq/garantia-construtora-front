import { FaArrowLeft } from "react-icons/fa"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import cookie from "react-cookies";
import { useNavigate, useParams } from "react-router-dom";
import { maintenanceRequest, questionsRequest } from "../services/maintenanceServices";
import { HashLoader } from "react-spinners";
import Collapse from "../components/Collapse";
import { IMaintenanceData, IQuestionData } from "../types/types";
import Button from "../components/Button";

function DashboardMaintenance() {
  const { userData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenance, setMaintenance] = useState<IMaintenanceData>({} as IMaintenanceData);
  const [questions, setQuestions] = useState<IQuestionData[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    if(!userData?.data?.business?.id) return;
    if(id) {
      maintenanceRequest(token, id, userData.data.business.id)
      .then((res) => {
        console.log('maintenance', res);
        setMaintenance(res.data);
      });

      questionsRequest(token, id, userData.data.business.id)
      .then((res) => {
        setQuestions(res.data.data);
        setIsLoading(false);
      });
    }
  }, [userData, id]);

  return (
    <div className="w-full h-full">
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-1 cursor-pointer mb-4">
        <FaArrowLeft className="text-2xl text-blue-1" /> Voltar
      </div>
      <div className="flex gap-2 items-center">
        {!maintenance?.is_completed && (
          <Button
            type="button"
            onClick={() => navigate('/business/create')}
            customStyle="!px-4 !py-1"
            text={(
              <span className="inline-flex items-center gap-2">
                Editar
              </span>
            )}
          />
        )}
        <h1 className="text-4xl text-typo-primary"> 
          <span className="text-blue-1 font-bold">
            { maintenance?.name || '' }
          </span>
        </h1>
      </div>
      { maintenance?.description && (
      <div className="text-typo-primary my-2">
        <p>Início: {new Date(maintenance.start_date).toLocaleDateString()} - Fim: {new Date(maintenance.end_date).toLocaleDateString()}</p>
        <p>{ maintenance?.description || '' }</p>
      </div>
      )}
      { userData?.data?.business?.id && (
      <div className="flex flex-col mt-6">
        {!isLoading ? (
          <div className="flex flex-col flex-wrap gap-4 divide-x-px divide-gray-600">
            {questions.length > 0 ? questions.map((maintenance, i) => (
              <Collapse key={i} title={maintenance.name} observation={maintenance.observation} status={maintenance.status} description={maintenance.description} />
            )) : (
              <p className="text-typo-primary dark:text-typo-primary">Sem tópicos nesta manutenção.</p>
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

export default DashboardMaintenance;