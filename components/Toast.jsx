import { useApp } from '../context/AppContext'
import './Toast.css'

export default function Toast() {
  const { toastMsg, toastVis } = useApp()
  return (
    <div id="toast" className={toastVis ? 'vis' : ''}>
      {toastMsg}
    </div>
  )
}
