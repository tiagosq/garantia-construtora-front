export function formatPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (phoneNumber.length === 13) {
      // Telefone com código do país (13 dígitos)
      return phoneNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  } else if (phoneNumber.length === 11) {
      // Telefone sem código do país (11 dígitos)
      return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
      throw new Error('O número de telefone deve ter 11 ou 13 dígitos.');
  }
}

export function formatCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}