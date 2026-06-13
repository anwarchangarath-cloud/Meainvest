import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { TrendingUp, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'

export default function Register() {
  const [form, setForm] = useState({ displayName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    setLoading(true)
    setError('')
    try {
      await register(form.email, form.password, form.displayName, form.phone)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      const code = err.code || ''
      setError(
        code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : code === 'auth/weak-password'
          ? 'Password is too weak. Use at least 8 characters.'
          : code === 'auth/operation-not-allowed'
          ? 'Email/Password sign-in is not enabled. Please contact the administrator.'
          : code === 'auth/invalid-email'
          ? 'Invalid email address.'
          : code === 'auth/network-request-failed'
          ? 'Network error. Check your internet connection.'
          : `Registration failed: ${err.message || code || 'Unknown error'}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mea-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-mea-red/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-red-gradient flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">MEA <span className="text-mea-red">Investment</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Create Your Account</h1>
          <p className="text-white/40 text-sm">Join thousands of investors across MEA</p>
        </div>

        <GlassCard className="p-7">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Registration Successful!</h3>
              <p className="text-white/40 text-sm">Your account is pending admin approval. Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="text-white/50 text-xs mb-1.5 block" htmlFor="displayName">Full Name</label>
                <input id="displayName" name="displayName" type="text" required value={form.displayName}
                  onChange={handleChange} placeholder="Your full legal name" className="input-field" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required value={form.email}
                  onChange={handleChange} placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block" htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="+1 234 567 890" className="input-field" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block" htmlFor="password">Password</label>
                <div className="relative">
                  <input id="password" name="password" type={showPw ? 'text' : 'password'} required
                    value={form.password} onChange={handleChange} placeholder="Min. 8 characters" className="input-field pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block" htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type={showPw ? 'text' : 'password'} required
                  value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" className="input-field" />
              </div>

              <div className="pt-1">
                <p className="text-white/30 text-xs leading-relaxed mb-4">
                  By registering, you agree to our investment terms. Account activation requires admin approval. Projected returns are subject to investment agreements and are not guaranteed.
                </p>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-mea-red hover:text-mea-red/80 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
