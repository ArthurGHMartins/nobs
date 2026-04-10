// ============================================================
//  FORMATTERS
// ============================================================

/** R$ 1.234,56 */
export function fmtMoeda(val) {
  const n = parseFloat(val) || 0
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/** Remove tudo que não é dígito */
export function limparCPF(cpf) {
  return String(cpf).replace(/\D/g, '')
}

/** Aplica máscara 000.000.000-00 enquanto o usuário digita */
export function mascaraCPF(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/** Aplica máscara DD/MM/AAAA enquanto o usuário digita */
export function mascaraData(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
}

/** Retorna iniciais de um nome (máx 2 letras) */
export function iniciais(nome) {
  if (!nome) return '?'
  const parts = nome.trim().split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
