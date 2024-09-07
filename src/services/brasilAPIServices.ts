export const getCEP = async (cep: string) => {
  const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  if(!response.ok) {
    throw new Error('CEP não encontrado');
  }
  const data = await response.json();
  return data;
};

export const getCNPJ = async (cnpj: string) => {
  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
  if(!response.ok) {
    throw new Error('CNPJ não encontrado');
  }
  const data = await response.json();
  return data;
};