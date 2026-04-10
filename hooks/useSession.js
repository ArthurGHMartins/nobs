// ============================================================
//  useSession
//  Gerencia a sessão do cliente no localStorage.
//  Timeout automático após TIMEOUT_MIN minutos de inatividade.
// ============================================================
import { useCallback, useEffect, useRef } from 'react'
import { TIMEOUT_MIN } from '../utils/constants'

const STORAGE_KEY = 'nobs_sessao'

/** Lê a sessão salva. Retorna null se não existir ou estiver expirada. */
export function lerSessao() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Salva sessão no localStorage. */
export function salvarSessao(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados))
}

/** Remove sessão do localStorage. */
export function limparSessao() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Hook que reinicia um timer de inatividade.
 * Chama onTimeout() após TIMEOUT_MIN minutos sem interação.
 *
 * @param {Function} onTimeout — chamado quando a sessão expira
 * @param {boolean}  ativo     — só roda se true (usuário logado)
 */
export function useInactivityTimeout(onTimeout, ativo) {
  const timerRef = useRef(null)

  const reiniciar = useCallback(() => {
    if (!ativo) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(onTimeout, TIMEOUT_MIN * 60 * 1000)
  }, [ativo, onTimeout])

  useEffect(() => {
    if (!ativo) return

    const eventos = ['mousemove', 'keydown', 'touchstart', 'click']
    eventos.forEach(ev => window.addEventListener(ev, reiniciar, { passive: true }))
    reiniciar()

    return () => {
      clearTimeout(timerRef.current)
      eventos.forEach(ev => window.removeEventListener(ev, reiniciar))
    }
  }, [ativo, reiniciar])
}
