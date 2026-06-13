import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Shield, Eye, EyeOff, AlertCircle, TrendingUp } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { adminLogin } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminLogin(form.email, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Admin login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mea-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mea-red/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-red-gradient flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">MEA <span className="text-mea-red">Investment</span></span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mea-red/10 border border-mea-red/20 mb-4">
            <Shield size={12} className="text-mea-red" />
            <span className="text-mea-red text-xs font-semibold">Admin Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Access</h1>
          <p className="text-white/40 text-sm">Restricted to authorized personnel only</p>
        </div>

        <GlassCard className="p-7 border-mea-red/15">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="text-white/50 text-xs mb-1.5 block" htmlFor="email">Admin Email</label>
              <input id="email" name="email" type="email" required value={form.email}
                onChange={handleChange} placeholder="admin@meainvestment.com" className="input-field" autoComplete="email" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block" htmlFor="password">Admin Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPw ? 'text' : 'password'} required
                  value={form.password} onChange={handleChange} placeholder="Admin password" className="input-field pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2 disabled:opacity-60">
              <Shield size={15} />
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/25 text-xs mt-6">
          <Link to="/login" className="hover:text-white/50 transition-colors">
            ← Investor Login
          </Link>
        </p>
      </div>
    </div>
  )
}
