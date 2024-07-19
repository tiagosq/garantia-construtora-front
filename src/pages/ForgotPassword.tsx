import { useState } from "react"
import Input from "../components/Input"
import Label from "../components/Label"
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bg from '../assets/bg.webp';
import { forgotPasswordRequest } from "../services/authServices";

function ForgotPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    message: '',
    success: false,
  });
  const [form, setForm] = useState({
    email: '',
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
    forgotPasswordRequest(form.email).then((success) => {
      if (success) {
        setMessage({
          message: 'E-mail enviado com sucesso. Confira sua caixa de entrada.',
          success: true,
        });
        setTimeout(() => { 
          setMessage({ message: '', success: false });
          navigate('/login');
        }, 5000);
      } else {
        setMessage({
          message: 'Erro ao enviar e-mail.',
          success: false,
        });
        setTimeout(() => setMessage({ message: '', success: false }), 5000);
      }
    });
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
          </div>
          <div className="flex items-center">
            <div className={`text-xs italic ${message.success ? 'text-green-600' : 'text-red-600'}`}>
              {message.message !== '' && <div className="pt-1">{message.message}</div>}
            </div>
          </div>
          <div className="flex justify-between items-center gap-8 mt-2">
            <div className="flex flex-col items-start grow gap-3">
              <Button
                type="submit"
                text="Recuperar acesso"
                onClick={() => {}}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Link to="/login" className="text-sm text-blue-1 dark:text-typo-primary">Acessar minha conta</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;