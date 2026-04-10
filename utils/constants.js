// ============================================================
//  CONFIGURAÇÃO GLOBAL
//  Altere API_URL após republicar o Apps Script.
// ============================================================
export const API_URL =
  'https://script.google.com/macros/s/AKfycbxj3PGLunOqvaZe7pfhPdqJc3e38Dl3kuZGlY23Hwl7L6IT7AJTTzjlfallzQSAoUJX/exec'

export const WPP_NUM    = '5508003235100'
export const TIMEOUT_MIN = 15

// ============================================================
//  MENSAGENS DE LOADING
//  Para adicionar: inclua nova string no array.
// ============================================================
export const MSGS_LOADING = [
  'Aplicando anestesia na burocracia...',
  'Diagnosticando quanto o governo te deve...',
  'Você cuidou dos pacientes. A gente cuida do que é seu.',
  'Burocracia tem cura. Se chama Nobs.',
  'CID Z55 — Problemas burocráticos. Prognóstico: favorável.',
  'Verificando os sinais vitais do seu processo...',
  'Prescrevendo a recuperação do seu dinheiro...',
  'Tirando mais uma pedra do seu caminho...',
  'Dando alta para o seu dinheiro retido...',
  'Enquanto você salva vidas, a gente salva seu dinheiro...',
]

// ============================================================
//  TEXTOS POR FASE DO PROCESSO
// ============================================================
export const TEXTOS_FASE = {
  'Auditoria': {
    titulo: 'Em auditoria',
    desc: 'Estamos analisando seus contracheques com precisão para identificar todos os descontos indevidos. Esta é a etapa de levantamento do seu potencial de recuperação.',
    cor: 'amber',
  },
  'Em Analise': {
    titulo: 'Em análise',
    desc: 'O processo está sendo analisado junto aos órgãos competentes. Estamos acompanhando cada etapa para garantir a melhor recuperação possível.',
    cor: 'blue',
  },
  'Mandado de Segurança': {
    titulo: 'Mandado de segurança',
    desc: 'Um mandado de segurança foi protocolado. Estamos atuando judicialmente para assegurar a devolução do que é seu por direito.',
    cor: 'amber',
  },
  'Despacho Decisório': {
    titulo: 'Despacho decisório',
    desc: 'Estamos na reta final. O despacho decisório está em andamento e a recuperação do seu crédito está prestes a ser concluída.',
    cor: 'green',
  },
}

export const FASES_ORDEM = [
  'Auditoria',
  'Em Analise',
  'Mandado de Segurança',
  'Despacho Decisório',
]

// ============================================================
//  CONSULTORES
//  Adicione a URL da foto quando disponível.
// ============================================================
export const CONSULTORES_FOTOS = {
  'Arthur Martins': null,
  'Hugo Coelho':    null,
  'Denilson Mello': null,
  'Juliana Alves':  null,
}
