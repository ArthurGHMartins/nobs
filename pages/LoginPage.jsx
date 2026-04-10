import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { login } from '../api/sheets'
import { mascaraCPF, mascaraData } from '../utils/formatters'
import { MSGS_LOADING } from '../utils/constants'
import './LoginPage.css'

export default function LoginPage() {
  const { salvarSessao, irPara } = useApp()

  const [cpf, setCpf]   = useState('')
  const [nasc, setNasc] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgIdx, setMsgIdx]   = useState(0)
  const [msgVis, setMsgVis]   = useState(true)

  // Nome Guerra do localStorage (visita anterior)
  const nomeGuerra = localStorage.getItem('nobs_nome_guerra') || ''

  // Rotação dos textos de loading
  const msgTimer = useRef(null)
  useEffect(() => {
    if (!loading) return
    msgTimer.current = setInterval(() => {
      setMsgVis(false)
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % MSGS_LOADING.length)
        setMsgVis(true)
      }, 300) // fade out → troca → fade in
    }, 2000)
    return () => clearInterval(msgTimer.current)
  }, [loading])

  async function handleLogin() {
    setErro('')
    const cpfLimpo = cpf.replace(/\D/g, '')
    if (cpfLimpo.length !== 11) { setErro('CPF inválido.'); return }
    if (nasc.length !== 10)     { setErro('Data de nascimento inválida.'); return }

    setLoading(true)
    try {
      const dados = await login(cpfLimpo, nasc)
      if (dados.erro) {
        setErro(dados.erro)
        return
      }
      // Persiste nome guerra para próximas visitas
      localStorage.setItem('nobs_nome_guerra', dados.nomeGuerra)

      salvarSessao({ cpf: cpfLimpo, nomeGuerra: dados.nomeGuerra, processos: dados.processos })

      if (dados.processos.length === 1) { 
        irPara('home')
      } else {
        irPara('selecao')
      }
    } catch {
      irPara('e404')
    } finally {
      setLoading(false)
    }
  }

  function handleCpf(e) {
    setCpf(mascaraCPF(e.target.value))
    setErro('')
  }

  function handleNasc(e) {
    setNasc(mascaraData(e.target.value))
    setErro('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !loading) handleLogin()
  }

  return (
    <div className="login-page">

      {/* Logo */}
      <div className="login-logo-wrap">
        <img src="/logo.png" alt="Nobs" className="login-logo" />
      </div>

      {/* Boas vindas */}
      <p className="login-bv">
        {nomeGuerra ? `Bem-vindo, ${nomeGuerra}` : 'Bem-vindo'}
      </p>

      {/* Formulário */}
      <div className="login-form">
        <p className="login-label">Login</p>

        <input
          className="login-input"
          type="text"
          inputMode="numeric"
          placeholder="CPF"
          maxLength={14}
          value={cpf}
          onChange={handleCpf}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <input
          className="login-input"
          type="text"
          inputMode="numeric"
          placeholder="Data de nascimento"
          maxLength={10}
          value={nasc}
          onChange={handleNasc}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        {erro && <p className="login-erro">{erro}</p>}

        <button
          className={`btn-pri login-btn${loading ? ' loading' : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="login-spinner" />
              <span
                className={`login-msg${msgVis ? ' vis' : ''}`}
              >
                {MSGS_LOADING[msgIdx]}
              </span>
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </div>

    </div>
  )
}