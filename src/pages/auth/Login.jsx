import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { TrendingUp, Eye, EyeOff, AlertCircle } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const { login, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : err.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : err.code === 'auth/too-many-requests'
          ? 'Too many failed attempts. Please try again later.'
          : 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleReset() {
    if (!form.email) return setError('Enter your email address first.')
    try {
      await resetPassword(form.email)
      setResetSent(true)
    } catch {
      setError('Could not send reset email. Check your email address.')
    }
  }

  return (
    <div className="min-h-screen bg-mea-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-mea-red/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-red-gradient flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">MEA <span className="text-mea-red">Investment</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-white/40 text-sm">Sign in to your investor account</p>
        </div>

        <GlassCard className="p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}
            {resetSent && (
              <div className="p-3.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                Password reset email sent! Check your inbox.
              </div>
            )}

            <div>
              <label className="text-white/50 text-xs mb-1.5 block" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required value={form.email}
                onChange={handleChange} placeholder="your@email.com" className="input-field" autoComplete="email" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-white/50 text-xs" htmlFor="password">Password</label>
                <button type="button" onClick={handleReset} className="text-mea-red/70 hover:text-mea-red text-xs transition-colors cursor-pointer">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input id="password" name="password" type={showPw ? 'text' : 'password'} required
                  value={form.password} onChange={handleChange} placeholder="Your password" className="input-field pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2 disabled:opacity-60">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-mea-red hover:text-mea-red/80 font-medium transition-colors">
            Register Now
          </Link>
        </p>
        <p className="text-center text-white/25 text-xs mt-3">
          <Link to="/admin/login" className="hover:text-white/50 transition-colors">
            Admin Portal →
          </Link>
        </p>
      </div>
    </div>
  )
}
