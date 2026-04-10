// ============================================================
//  AppContext
//  Estado global: sessão, processo ativo, tema, toast.
// ============================================================
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { lerSessao, salvarSessao, limparSessao, useInactivityTimeout } from '../hooks/useSession'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── Tema ────────────────────────────────────────────────
  const [tema, setTema] = useState(() => localStorage.getItem('nobs_tema') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('nobs_tema', tema)
  }, [tema])

  const alternarTema = useCallback(() => {
    setTema(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  // ── Sessão ──────────────────────────────────────────────
  const [sessao, setSessaoState] = useState(() => lerSessao())

  const salvar = useCallback((dados) => {
    salvarSessao(dados)
    setSessaoState(dados)
  }, [])

  const logout = useCallback(() => {
    limparSessao()
    setSessaoState(null)
    setPagina('login')
  }, [])

  // Timeout de inatividade
  useInactivityTimeout(logout, !!sessao)

  // ── Processo ativo ──────────────────────────────────────
  const [processoAtual, setProcessoAtual] = useState(null)

  // ── Navegação ───────────────────────────────────────────
  // Páginas: 'splash' | 'login' | 'selecao' | 'home' | 'inds' | 'docs' | 'cfg'
  const [pagina, setPagina] = useState('splash')

  const irPara = useCallback((p) => setPagina(p), [])

  // ── Toast ───────────────────────────────────────────────
  const [toastMsg, setToastMsg]   = useState('')
  const [toastVis, setToastVis]   = useState(false)
  const toastTimer = useCallback((msg, ms = 3000) => {
    setToastMsg(msg)
    setToastVis(true)
    setTimeout(() => setToastVis(false), ms)
  }, [])

  // ── Valores ocultos ─────────────────────────────────────
  const [valoresOcultos, setValoresOcultos] = useState(false)
  const toggleOlho = useCallback(() => setValoresOcultos(v => !v), [])

  return (
    <AppContext.Provider
      value={{
        tema, alternarTema,
        sessao, salvarSessao: salvar, logout,
        processoAtual, setProcessoAtual,
        pagina, irPara,
        toast: toastTimer, toastMsg, toastVis,
        valoresOcultos, toggleOlho,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/** Hook de atalho: const { sessao, irPara } = useApp() */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve estar dentro de <AppProvider>')
  return ctx
}
