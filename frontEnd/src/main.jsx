import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './components/store/store.js'
// import { AuthProvider } from './components/store/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  
  // <AuthProvider>
  <Provider store={store}>
  <StrictMode >
    <App />
  </StrictMode>,
  </Provider>
  // </AuthProvider>
  
)
