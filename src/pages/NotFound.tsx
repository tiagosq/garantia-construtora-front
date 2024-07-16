import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-screen bg-secondary flex justify-center items-center">
      <h1 className="text-blue-1 text-8xl font-bold"
        style={{ textOrientation: 'upright', writingMode: 'vertical-rl', letterSpacing: -24 }}>
          404
      </h1>
      <div className="flex flex-col gap-4 mt-6">
        <p className="text-4xl">Página não encontrada</p>
        <Link to="/" className="text-blue-2 underline">
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}

export default NotFound;