import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import './SplashScreen.css'

export default function SplashScreen() {
  const { sessao, irPara } = useApp()
  const [saindo, setSaindo] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSaindo(true), 2000)
    const navTimer  = setTimeout(() => irPara(sessao ? 'home' : 'login'), 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [sessao, irPara])

  return (
    <div className={`splash${saindo ? ' saindo' : ''}`}>
      <div className="splash-logo-wrap">
        <img src="/logo.png" alt="Nobs" className="splash-logo" />
      </div>
      <span className="splash-tagline">Portal do Cliente</span>
    </div>
  )
}
