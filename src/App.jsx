import { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { RequireAuth, RequireAdmin, RedirectIfAuth } from './components/ui/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Landing from './pages/Landing'
import About from './pages/About'
import Plans from './pages/Plans'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLogin from './pages/auth/AdminLogin'
import UserDashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'IBM Plex Sans, sans-serif', padding: '2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div style={{ color: '#C1121F', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>MEA Investment</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Application Error</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '1.5rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', wordBreak: 'break-all' }}>
              {this.state.error?.message}
            </div>
            <button onClick={() => window.location.reload()}
              style={{ background: '#C1121F', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <CurrencyProvider>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
            success: { iconTheme: { primary: '#C1121F', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/plans" element={<PublicLayout><Plans /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>} />
          <Route path="/register" element={<RedirectIfAuth><Register /></RedirectIfAuth>} />
          <Route path="/admin/login" element={<RedirectIfAuth><AdminLogin /></RedirectIfAuth>} />

          {/* Protected */}
          <Route path="/dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />

          {/* 404 */}
          <Route path="*" element={
            <PublicLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="text-mea-red text-8xl font-bold mb-4">404</div>
                  <h1 className="text-white text-2xl font-semibold mb-2">Page Not Found</h1>
                  <p className="text-white/40 mb-6">The page you are looking for does not exist.</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </AuthProvider>
      </CurrencyProvider>
    </BrowserRouter>
    </ErrorBoundary>
  )
}
