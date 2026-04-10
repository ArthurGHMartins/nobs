// ============================================================
//  API — NOBS PORTAL
//  Todas as chamadas ao Google Apps Script passam por aqui.
//  Nenhuma página faz fetch diretamente.
// ============================================================
import { API_URL } from '../utils/constants'

async function post(payload) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return resp.json()
}

// ============================================================
//  LOGIN
//  Retorna { ok, nomeGuerra, processos[] } ou { erro }
// ============================================================
export async function login(cpf, nascimento) {
  return post({ action: 'login', cpf, nascimento })
}

// ============================================================
//  GET PROCESSO
//  Retorna { ok, processo } ou { erro }
// ============================================================
export async function getProcesso(cpf, codigo) {
  return post({ action: 'getProcesso', cpf, codigo })
}

// ============================================================
//  GET NOTIFICAÇÕES
//  Retorna { ok, notificacao } — apenas a de maior prioridade
// ============================================================
export async function getNotificacoes(cpf, codigo) {
  return post({ action: 'getNotificacoes', cpf, codigo })
}

// ============================================================
//  MARCAR NOTIFICAÇÃO AVULSA COMO VISTA
// ============================================================
export async function marcarNotificacaoVista(cpf, rowIndex) {
  return post({ action: 'marcarNotificacaoVista', cpf, rowIndex })
}

// ============================================================
//  ATUALIZAR LAST SEEN
//  campos ex: { statusLastSeen: 'Análise', recuperadoLastSeen: 7000 }
// ============================================================
export async function atualizarLastSeen(cpf, codigo, campos) {
  return post({ action: 'atualizarLastSeen', cpf, codigo, campos })
}

// ============================================================
//  GET INDICAÇÕES
//  Retorna { ok, indicacoes[] }
// ============================================================
export async function getIndicacoes(cpf, codigo) {
  return post({ action: 'getIndicacoes', cpf, codigo })
}

// ============================================================
//  REGISTRAR ACESSO (fire-and-forget — falha silenciosa)
// ============================================================
export function registrarAcesso(cpf, nome, codigo) {
  post({ action: 'registrarAcesso', cpf, nome, codigo }).catch(() => {})
}
