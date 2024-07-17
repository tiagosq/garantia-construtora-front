import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';

function Profile() {
  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    passwordStrength();
  }, [form]);

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

  const passwordStrength = () => {
    const { password, passwordConfirm } = form;
    let pass = 0;
    if (password !== passwordConfirm) {
      setStrength(0);
      return;
    }
    if (password.length >= 6) {
      pass += 1;
    }
    if (password.match(/[a-z]/)) {
      pass += 1;
    }
    if (password.match(/[A-Z]/)) {
      pass += 1;
    }
    if (password.match(/[0-9]/)) {
      pass += 1;
    }
    if (password.match(/[^a-zA-Z0-9]/)) {
      pass += 1;
    }
    setStrength(pass);
  };

  const passwordStrengthColor = [
    'text-red-900',
    'text-red-900',
    'text-red-600',
    'text-yellow-600',
    'text-green-300',
    'text-green-600',
  ];

  const bgStrengthColor = [
    'bg-red-900',
    'bg-red-900',
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-300',
    'bg-green-300',
  ];

  const passwordStrengthText = [
    'Senha inválida/diferentes',
    'Senha muito fraca',
    'Senha fraca',
    'Senha razoável',
    'Senha boa',
    'Senha forte',
  ];

  return (
    <div className="h-full w-full flex flex-col
      gap-6 bg-secondary">
      <h1 className="text-3xl text-blue-1 font-bold">
        Configurações
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-3">
          <Label text="Digite sua nova senha">
            <Input
              type="password"
              name="password"
              value={form.password}
              placeholder="******"
              required
              onChange={handleChange}
            />
          </Label>
          <Label text="Digite novamente sua senha">
            <Input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              placeholder="******"
              required
              onChange={handleChange}
            />
          </Label>
        </div>
        {form.password !== '' && (
        <div>
          <div className="w-full flex items-center gap-2 mt-2">
            <span className={`h-1 grow ${strength >= 1 ? bgStrengthColor[strength] : 'bg-gray-50'}`}></span>
            <span className={`h-1 grow ${strength >= 2 ? bgStrengthColor[strength] : 'bg-gray-50'}`}></span>
            <span className={`h-1 grow ${strength >= 3 ? bgStrengthColor[strength] : 'bg-gray-50'}`}></span>
            <span className={`h-1 grow ${strength >= 4 ? bgStrengthColor[strength] : 'bg-gray-50'}`}></span>
            <span className={`h-1 grow ${strength >= 5 ? bgStrengthColor[strength] : 'bg-gray-50'}`}></span>
          </div>
          <span className={`text-xs ${passwordStrengthColor[strength]}`}>{passwordStrengthText[strength]}</span>
        </div>
        )}
        <div className="flex justify-between items-center gap-8 mt-2">
          <div className="flex flex-col items-start grow gap-3">
            <Button
              type="submit"
              text="Alterar senha"
              onClick={() => {}}
              disabled={strength < 4}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile