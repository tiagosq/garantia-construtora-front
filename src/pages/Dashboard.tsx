import { FaCalendarAlt } from "react-icons/fa"
import Card from "../components/Card"

function Dashboard() {
  const data = [
    {
      building: {
        id: 1,
        name: 'Moinhos de Vento',
      },
      maintenance: {
        id: 1,
        title: 'Manutenção de Elevadores',
        deadline: '10/10/2021',
        questions: 20,
        answered: 10,
      }
    },
    {
      building: {
        id: 1,
        name: 'Moinhos de Vento',
      },
      maintenance: {
        id: 1,
        title: 'Manutenção Estrutural',
        deadline: '10/10/2024',
        questions: 20,
        answered: 20,
      }
    },
    {
      building: {
        id: 1,
        name: 'Moinhos de Vento',
      },
      maintenance: {
        id: 1,
        title: 'Manutenção Externa',
        deadline: '10/10/2024',
        questions: 20,
        answered: 0,
      }
    },
  ]


  return (
    <div className="w-full h-full">
      <h1 className="text-4xl text-typo-primary">Olá, <span className="text-blue-1 font-bold">Usuário</span></h1>
      <div className="flex flex-col mt-12">
        <div className="inline-flex items-baseline gap-2 font-bold text-xl mb-4">
          <FaCalendarAlt className="text-typo-primary" />
          <span>Próximas conferências (30 dias)</span>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-4">
          {data.map((item, index) => (
            <Card key={index} building={item.building} maintenance={item.maintenance} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard