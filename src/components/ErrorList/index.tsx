function ErrorList({ errors }: { errors: string[] }) {
  return (
    <>
    {errors && errors.length > 0 && (
      <div className="w-full bg-red-200 text-red-800 mb-8 rounded p-3">
        <h2 className="font-bold">Ocorreu um erro durante o preenchimento</h2>
        <ul className="italic list-disc list-inside mt-2">
          {errors.map((e) => <li>{e}</li>)}
        </ul>
      </div>
    )}
    </>
  )
}

export default ErrorList