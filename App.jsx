// ============================================================
//  App.jsx — roteador principal
// ============================================================
import { AppProvider, useApp } from './context/AppContext'

import SplashScreen      from './pages/SplashScreen'
import LoginPage         from './pages/LoginPage'
import SelecaoPage       from './pages/SelecaoPage'
import HomePage          from './pages/HomePage'
import IndicacoesPage    from './pages/IndicacoesPage'
import DocumentosPage    from './pages/DocumentosPage'
import ConfiguracoesPage from './pages/ConfiguracoesPage'
import ErroPage404 from './pages/ErroPage404'

import BottomNav from './components/BottomNav'
import Toast     from './components/Toast'

function Router() {
  const { pagina } = useApp()

  const paginasComNav = ['home', 'inds', 'docs', 'cfg']
  const mostrarNav    = paginasComNav.includes(pagina)

  return (
    <>
      {pagina === 'splash'  && <SplashScreen />}
      {pagina === 'login'   && <LoginPage />}
      {pagina === 'selecao' && <SelecaoPage />}
      {pagina === 'home'    && <HomePage />}
      {pagina === 'inds'    && <IndicacoesPage />}
      {pagina === 'docs'    && <DocumentosPage />}
      {pagina === 'cfg'     && <ConfiguracoesPage />}
      {pagina === 'e404'    && <ErroPage404 />}

      {mostrarNav && <BottomNav />}
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}
