import { useState } from "react"
import Input from "../components/Input"
import Label from "../components/Label"
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import bg from '../assets/bg.webp';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    keepLogged: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // ! Implementar lógica de autenticação
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen flex justify-end items-stretch bg-secondary bg-cover"
    style={{ backgroundImage: `url(${bg})` }}>
      <div className="h-full w-full md:w-[40%] md:max-w-[450px] px-8 py-4 flex flex-col
      justify-center gap-6 bg-secondary">
        <h1 className="font-bold text-4xl text-blue-1">
          Garantia<br />
          Construtora
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-3">
            <Label text="E-mail">
              <Input
                type="email"
                name="email"
                value={form.email}
                placeholder="usuario@email.com.br"
                required
                onChange={handleChange}
              />
            </Label>
            <Label text="Senha">
              <Input
                type="password"
                name="password"
                value={form.password}
                placeholder="******"
                required
                onChange={handleChange}
              />
            </Label>
          </div>
          <div className="flex justify-between items-center gap-8 mt-2">
            <div className="flex flex-col items-start grow gap-3">
              <Checkbox
                label="Manter conectado"
                name="keepLogged"
                checked={form.keepLogged}
                onChange={handleChange}
              />
              <Button
                type="submit"
                text="Acessar"
                onClick={() => {}}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Link to="/forgot-password" className="text-sm text-blue-1 dark:text-typo-primary">Esqueci a senha</Link>
              <Link to="/register" className="text-sm text-blue-1 dark:text-typo-primary">Ou crie sua conta agora</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login