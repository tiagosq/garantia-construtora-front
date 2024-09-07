import { useEffect, useState } from "react"
import Input from "../components/Input"
import Label from "../components/Label"
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bg from '../assets/bg.webp';
import cookie from 'react-cookies';
import { loginRequest } from "../services/authServices";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
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
    if (!form.email || !form.password) {
      alert('Preencha todos os campos');
      return;
    } else {
      setError('');
      loginRequest(form.email, form.password).then(({ data }) => {
        if (data?.access_token) {
          cookie.save('GC_JWT_AUTH', data.access_token, { path: '/' });
          navigate('/dashboard');
        }
      }).catch((error) => {
        setError(error.message);
        setTimeout(() => setError(''), 5000);
      });
    }
  };

  useEffect(() => {
    const token = cookie.load('GC_JWT_AUTH');
    // Adicionar uma requisição aqui.
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </Label>
          </div>
          <div className="flex items-center">
            <div className="text-xs italic text-red-600">
              {error && <div className="pt-1">{error}</div>}
            </div>
          </div>
          <div className="flex justify-between items-start gap-8 mt-4">
            <div className="flex flex-col items-start grow gap-3">
              <Button
                type="submit"
                text="Acessar"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Link to="/forgot-password" className="text-sm text-blue-1 dark:text-typo-primary">Esqueci a senha</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login