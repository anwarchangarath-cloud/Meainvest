import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, getDoc
} from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { db } from '../../firebase/config'
import { uploadToR2 } from '../../utils/upload'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import {
  LayoutDashboard, TrendingUp, DollarSign, FileText, LogOut,
  Upload, Bell, User, ChevronRight, AlertCircle, CheckCircle,
  Clock, Download, MessageSquare, X, Menu, Building2, UserPlus, Copy
} from 'lucide-react'

const MENU = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'invest', icon: TrendingUp, label: 'New Investment' },
  { id: 'investments', icon: DollarSign, label: 'My Investments' },
  { id: 'upload', icon: Upload, label: 'Upload Receipt' },
  { id: 'statements', icon: FileText, label: 'Statements' },
  { id: 'withdraw', icon: Download, label: 'Withdrawal' },
  { id: 'referrals', icon: UserPlus, label: 'Referrals' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'profile', icon: User, label: 'My Profile' },
  { id: 'support', icon: MessageSquare, label: 'Support' },
]

export default function UserDashboard() {
  const { currentUser, userProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [page, setPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [investments, setInvestments] = useState([])
  const [plans, setPlans] = useState([])
  const [notifications, setNotifications] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])
  const [commissions, setCommissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) return
    const unsubs = []

    unsubs.push(onSnapshot(
      query(collection(db, 'investments'), where('userId', '==', currentUser.uid)),
      (snap) => setInvestments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    ))
    unsubs.push(onSnapshot(collection(db, 'investmentPlans'), (snap) => {
      setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((p) => p.active))
    }))
    unsubs.push(onSnapshot(
      query(collection(db, 'notifications'), where('userId', '==', currentUser.uid)),
      (snap) => setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    ))
    unsubs.push(onSnapshot(collection(db, 'bankAccounts'), (snap) => {
      setBankAccounts(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((a) => a.active))
    }))
    unsubs.push(onSnapshot(
      query(collection(db, 'commissions'), where('referrerId', '==', currentUser.uid)),
      (snap) => setCommissions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    ))

    setLoading(false)
    return () => unsubs.forEach((u) => u())
  }, [currentUser])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const activeInvestments = investments.filter((i) => i.status === 'active')
  const totalInvested = investments.reduce((sum, i) => sum + (i.amount || 0), 0)
  const totalReturn = activeInvestments.reduce((sum, i) => sum + (i.projectedReturn || 0), 0)
  const unreadNotifs = notifications.filter((n) => !n.read).length

  function NavItem({ item }) {
    const Icon = item.icon
    const isActive = page === item.id
    return (
      <button
        onClick={() => { setPage(item.id); setSidebarOpen(false) }}
        className={`sidebar-item w-full text-left relative ${isActive ? 'active' : ''}`}
      >
        <Icon size={17} className={isActive ? 'text-mea-red' : 'text-white/40 group-hover:text-white/70'} />
        <span className="text-sm">{item.label}</span>
        {item.id === 'notifications' && unreadNotifs > 0 && (
          <span className="ml-auto w-5 h-5 rounded-full bg-mea-red text-white text-xs flex items-center justify-center">
            {unreadNotifs}
          </span>
        )}
      </button>
    )
  }

  if (loading) return (
    <div className="min-h-screen bg-mea-black flex items-center justify-center">
      <LoadingSpinner size="lg" className="text-mea-red" />
    </div>
  )

  return (
    <div className="min-h-screen bg-mea-black flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-mea-deep border-r border-white/5 flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-gradient flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
            <span className="text-white font-bold text-base">MEA <span className="text-mea-red">Investment</span></span>
          </Link>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
            <div className="w-9 h-9 rounded-full bg-mea-red/20 border border-mea-red/30 flex items-center justify-center flex-shrink-0">
              <span className="text-mea-red font-bold text-sm">
                {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{userProfile?.displayName || 'Investor'}</div>
              <div className="text-white/30 text-xs truncate">{currentUser?.email}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-0.5">
          {MENU.map((item) => <NavItem key={item.id} item={item} />)}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button onClick={handleLogout} className="sidebar-item w-full text-left text-white/40 hover:text-red-400">
            <LogOut size={17} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 bg-mea-black/80 backdrop-blur-md border-b border-white/5">
          <button className="lg:hidden btn-ghost p-1.5" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-base">
              {MENU.find((m) => m.id === page)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {userProfile?.status !== 'approved' && (
              <span className="hidden sm:flex items-center gap-1.5 text-yellow-400 text-xs px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/15">
                <AlertCircle size={12} />
                Pending Approval
              </span>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-5 lg:p-7">
          {page === 'overview' && <OverviewPage stats={{ activeInvestments, totalInvested, totalReturn, investments, unreadNotifs }} setPage={setPage} />}
          {page === 'invest' && <NewInvestmentPage plans={plans} bankAccounts={bankAccounts} userId={currentUser?.uid} />}
          {page === 'investments' && <InvestmentsPage investments={investments} />}
          {page === 'upload' && <UploadReceiptPage investments={investments} userId={currentUser?.uid} />}
          {page === 'statements' && <StatementsPage userId={currentUser?.uid} />}
          {page === 'withdraw' && <WithdrawalPage investments={investments} userId={currentUser?.uid} />}
          {page === 'referrals' && <ReferralsPage commissions={commissions} userProfile={userProfile} />}
          {page === 'notifications' && <NotificationsPage notifications={notifications} />}
          {page === 'profile' && <ProfilePage userProfile={userProfile} currentUser={currentUser} />}
          {page === 'support' && <SupportPage userId={currentUser?.uid} />}
        </div>
      </main>
    </div>
  )
}

/* ── Overview ── */
function OverviewPage({ stats, setPage }) {
  const { activeInvestments, totalInvested, totalReturn, investments, unreadNotifs } = stats
  const { fmt } = useCurrency()
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invested', value: fmt(totalInvested), icon: DollarSign, color: 'text-blue-400' },
          { label: 'Active Investments', value: activeInvestments.length, icon: TrendingUp, color: 'text-green-400' },
          { label: 'Projected Returns', value: fmt(totalReturn), icon: ChevronRight, color: 'text-mea-red' },
          { label: 'Notifications', value: unreadNotifs, icon: Bell, color: 'text-yellow-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <GlassCard key={label} className="p-5">
            <div className={`mb-3 ${color}`}><Icon size={18} /></div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-white/40 text-xs mt-0.5">{label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Investments</h2>
          <button onClick={() => setPage('investments')} className="text-mea-red text-xs hover:underline cursor-pointer">View All</button>
        </div>
        {investments.length === 0 ? (
          <div className="text-center py-10">
            <TrendingUp size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No investments yet.</p>
            <button onClick={() => setPage('invest')} className="btn-primary text-sm px-5 py-2.5 mt-4">Start Investing</button>
          </div>
        ) : (
          <div className="space-y-2">
            {investments.slice(0, 5).map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/3 border border-white/5">
                <div>
                  <div className="text-white text-sm font-medium">{inv.planName || 'Investment'}</div>
                  <div className="text-white/30 text-xs">{fmt(inv.amount || 0)}</div>
                </div>
                <Badge status={inv.status} />
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  )
}

/* ── New Investment ── */
function NewInvestmentPage({ plans, bankAccounts, userId }) {
  const { fmt } = useCurrency()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [amount, setAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submitRequest() {
    if (!selectedPlan || !amount) return setError('Please select a plan and enter an amount.')
    const amt = parseFloat(amount)
    if (amt < (selectedPlan.minAmount || 0)) return setError(`Minimum investment is ${fmt(selectedPlan.minAmount)}.`)
    setLoading(true)
    try {
      await addDoc(collection(db, 'investments'), {
        userId,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: amt,
        status: 'pending_payment',
        returnRate: selectedPlan.returnRate || 0,
        projectedReturn: amt * ((selectedPlan.returnRate || 0) / 100),
        type: selectedPlan.type || 'monthly',
        duration: selectedPlan.duration || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch {
      setError('Failed to submit investment request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <GlassCard className="p-8 text-center max-w-lg mx-auto animate-fade-in">
      <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
      <h2 className="text-white font-bold text-xl mb-2">Investment Request Submitted</h2>
      <p className="text-white/40 text-sm mb-6">Please transfer the investment amount to the bank account below and upload your receipt.</p>
      {bankAccounts[0] && (
        <div className="text-left bg-white/5 rounded-xl p-4 mb-4">
          <div className="text-mea-red text-xs font-semibold mb-2">COMPANY BANK DETAILS</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/40">Bank:</span><span className="text-white">{bankAccounts[0].bankName}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Account:</span><span className="text-white font-mono">{bankAccounts[0].accountNumber}</span></div>
            <div className="flex justify-between"><span className="text-white/40">SWIFT:</span><span className="text-white font-mono">{bankAccounts[0].swift}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Name:</span><span className="text-white">{bankAccounts[0].accountName}</span></div>
          </div>
        </div>
      )}
      <button onClick={() => { setSubmitted(false); setStep(1); setSelectedPlan(null); setAmount('') }}
        className="btn-secondary text-sm">Make Another Investment</button>
    </GlassCard>
  )

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? 'bg-mea-red text-white' : 'bg-white/10 text-white/30'
            }`}>{s}</div>
            <span className={`text-xs ${step >= s ? 'text-white' : 'text-white/30'}`}>
              {['Choose Plan', 'Enter Amount', 'Confirm'][s - 1]}
            </span>
            {s < 3 && <div className="w-8 h-px bg-white/10 mx-1" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Select Investment Plan</h2>
          {plans.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <p className="text-white/40">No investment plans available at this time.</p>
            </GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <button key={plan.id} onClick={() => { setSelectedPlan(plan); setStep(2) }}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? 'border-mea-red bg-mea-red/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                  }`}>
                  <div className="font-semibold text-white mb-1">{plan.name}</div>
                  <div className="text-mea-red font-bold text-lg mb-2">{plan.returnRate}%</div>
                  <div className="text-white/40 text-xs">{plan.type} · Min {fmt(plan.minAmount)} · {plan.duration}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 2 && selectedPlan && (
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Enter Investment Amount</h2>
          <GlassCard className="p-6">
            <div className="mb-4 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="text-white font-semibold">{selectedPlan.name}</div>
              <div className="text-mea-red text-sm">{selectedPlan.returnRate}% projected return · {selectedPlan.duration}</div>
            </div>
            {error && <div className="text-red-400 text-sm mb-3 flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
            <label className="text-white/50 text-xs mb-1.5 block">Investment Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min. ${fmt(selectedPlan.minAmount)}`}
              className="input-field mb-2"
              min={selectedPlan.minAmount}
            />
            {amount && (
              <div className="text-white/40 text-xs">
                Projected return: <span className="text-green-400">{fmt(parseFloat(amount || 0) * ((selectedPlan.returnRate || 0) / 100))}</span>
                {' '}· Subject to investment agreement
              </div>
            )}
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => { if (!amount) return setError('Enter amount.'); setError(''); setStep(3) }} className="btn-primary flex-1">Continue</button>
            </div>
          </GlassCard>
        </div>
      )}

      {step === 3 && selectedPlan && (
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Confirm Investment Request</h2>
          <GlassCard className="p-6 space-y-4">
            {[
              ['Plan', selectedPlan.name],
              ['Amount', fmt(parseFloat(amount))],
              ['Type', selectedPlan.type],
              ['Duration', selectedPlan.duration],
              ['Projected Return Rate', `${selectedPlan.returnRate}%`],
              ['Projected Return', fmt(parseFloat(amount) * ((selectedPlan.returnRate || 0) / 100))],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/40">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
            <p className="text-white/30 text-xs pt-2">
              By confirming, you acknowledge that projected returns are not guaranteed and are subject to the investment agreement and admin approval.
            </p>
            {error && <div className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
              <button onClick={submitRequest} disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                {loading ? 'Submitting...' : 'Confirm & Submit'}
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}

/* ── Investments List ── */
function InvestmentsPage({ investments }) {
  const { fmt } = useCurrency()
  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">My Investments</h2>
      {investments.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <TrendingUp size={36} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30">No investments yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {investments.map((inv) => (
            <GlassCard key={inv.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{inv.planName}</h3>
                    <Badge status={inv.status} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div><div className="text-white/30 text-xs">Invested</div><div className="text-white font-medium">{fmt(inv.amount || 0)}</div></div>
                    <div><div className="text-white/30 text-xs">Return Rate</div><div className="text-mea-red font-medium">{inv.returnRate || 0}%</div></div>
                    <div><div className="text-white/30 text-xs">Projected Return</div><div className="text-green-400 font-medium">{fmt(inv.projectedReturn || 0)}</div></div>
                    <div><div className="text-white/30 text-xs">Duration</div><div className="text-white">{inv.duration || '—'}</div></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Upload Receipt ── */
function UploadReceiptPage({ investments, userId }) {
  const { fmt } = useCurrency()
  const [selectedInv, setSelectedInv] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const pending = investments.filter((i) => ['pending_payment', 'receipt_uploaded'].includes(i.status))

  async function handleUpload(e) {
    e.preventDefault()
    if (!selectedInv || !file) return setError('Select investment and file.')
    setUploading(true)
    setError('')
    try {
      const url = await uploadToR2(file, `receipts/${userId}/${selectedInv}`)
      await addDoc(collection(db, 'receipts'), {
        userId,
        investmentId: selectedInv,
        fileUrl: url,
        fileName: file.name,
        status: 'pending',
        uploadedAt: serverTimestamp(),
      })
      setSuccess(true)
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-lg animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Upload Transfer Receipt</h2>
      <GlassCard className="p-6">
        {success ? (
          <div className="text-center py-6">
            <CheckCircle size={36} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Receipt Uploaded</h3>
            <p className="text-white/40 text-sm">Our team will verify your transfer within 1–3 business days.</p>
            <button onClick={() => setSuccess(false)} className="btn-secondary text-sm mt-4">Upload Another</button>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4">
            {error && <div className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Select Investment</label>
              <select value={selectedInv} onChange={(e) => setSelectedInv(e.target.value)} className="input-field">
                <option value="">Choose investment...</option>
                {pending.map((inv) => (
                  <option key={inv.id} value={inv.id}>{inv.planName} — {fmt(inv.amount)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Transfer Receipt (JPG, PNG, PDF)</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-mea-red/30 transition-colors cursor-pointer"
                onClick={() => document.getElementById('receipt-file')?.click()}>
                <Upload size={24} className="text-white/20 mx-auto mb-2" />
                <p className="text-white/40 text-sm">{file ? file.name : 'Click to select file'}</p>
                <p className="text-white/20 text-xs mt-1">Max 10MB · JPG, PNG, PDF</p>
              </div>
              <input id="receipt-file" type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            <button type="submit" disabled={uploading} className="btn-primary w-full py-3 disabled:opacity-60">
              <Upload size={15} />{uploading ? 'Uploading...' : 'Upload Receipt'}
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  )
}

/* ── Statements ── */
function StatementsPage({ userId }) {
  const [reports, setReports] = useState([])
  useEffect(() => {
    if (!userId) return
    const unsub = onSnapshot(
      query(collection(db, 'reports'), where('userId', '==', userId)),
      (snap) => setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    )
    return unsub
  }, [userId])

  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Statements & Reports</h2>
      {reports.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <FileText size={36} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No statements available yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <GlassCard key={r.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-mea-red" />
                <div>
                  <div className="text-white text-sm font-medium">{r.title}</div>
                  <div className="text-white/30 text-xs">{r.createdAt?.toDate?.()?.toLocaleDateString()}</div>
                </div>
              </div>
              {r.fileUrl && (
                <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-1.5 px-3">
                  <Download size={13} />Download
                </a>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Withdrawal ── */
function WithdrawalPage({ investments, userId }) {
  const { fmt } = useCurrency()
  const [selectedInv, setSelectedInv] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const eligible = investments.filter((i) => i.status === 'completed' || i.status === 'active')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedInv) return setError('Select an investment.')
    setLoading(true)
    try {
      const inv = investments.find((i) => i.id === selectedInv)
      await addDoc(collection(db, 'withdrawals'), {
        userId, investmentId: selectedInv,
        investmentAmount: inv?.amount || 0,
        projectedReturn: inv?.projectedReturn || 0,
        notes, status: 'pending',
        requestedAt: serverTimestamp(),
      })
      setSuccess(true)
    } catch {
      setError('Failed to submit request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Withdrawal Request</h2>
      <GlassCard className="p-6">
        {success ? (
          <div className="text-center py-6">
            <CheckCircle size={36} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Withdrawal Requested</h3>
            <p className="text-white/40 text-sm">Your request has been submitted. Admin will process it within 3–5 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Select Investment</label>
              <select value={selectedInv} onChange={(e) => setSelectedInv(e.target.value)} className="input-field">
                <option value="">Choose investment...</option>
                {eligible.map((inv) => (
                  <option key={inv.id} value={inv.id}>{inv.planName} — {fmt(inv.amount)} ({inv.status})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Additional Notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                placeholder="Any specific instructions..." className="input-field resize-none" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Withdrawal Request'}
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  )
}

/* ── Notifications ── */
function NotificationsPage({ notifications }) {
  const sorted = [...notifications].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Notifications</h2>
      {sorted.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <Bell size={36} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No notifications yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {sorted.map((n) => (
            <GlassCard key={n.id} className={`p-4 ${!n.read ? 'border-mea-red/20 bg-mea-red/3' : ''}`}>
              <div className="flex items-start gap-3">
                <Bell size={15} className={n.read ? 'text-white/20' : 'text-mea-red'} />
                <div>
                  <div className="text-white text-sm font-medium">{n.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">{n.message}</div>
                  <div className="text-white/20 text-xs mt-1">{n.createdAt?.toDate?.()?.toLocaleDateString()}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Profile ── */
function ProfilePage({ userProfile, currentUser }) {
  return (
    <div className="max-w-lg animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">My Profile</h2>
      <GlassCard className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center text-2xl font-bold text-mea-red">
            {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{userProfile?.displayName}</div>
            <div className="text-white/40 text-sm">{currentUser?.email}</div>
            <Badge status={userProfile?.status || 'pending'} className="mt-1" />
          </div>
        </div>
        <div className="space-y-3">
          {[
            ['Full Name', userProfile?.displayName],
            ['Email', currentUser?.email],
            ['Phone', userProfile?.phone || '—'],
            ['Account Status', userProfile?.status],
            ['Member Since', userProfile?.createdAt?.toDate?.()?.toLocaleDateString() || '—'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 border-b border-white/5 text-sm">
              <span className="text-white/40">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

/* ── Referrals ── */
function ReferralsPage({ commissions, userProfile }) {
  const { fmt } = useCurrency()
  const [copied, setCopied] = useState(false)

  const referralCode = userProfile?.referralCode
  const referralLink = referralCode ? `${window.location.origin}/register?ref=${referralCode}` : ''

  const totalEarned = commissions.filter((c) => c.status === 'paid').reduce((s, c) => s + (c.commissionAmount || 0), 0)
  const totalPending = commissions.filter((c) => c.status === 'pending').reduce((s, c) => s + (c.commissionAmount || 0), 0)

  function copyLink() {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-white font-semibold text-lg">Referral Program</h2>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center flex-shrink-0">
            <UserPlus size={18} className="text-mea-red" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Your Referral Code</h3>
            <p className="text-white/40 text-xs">Invite investors — earn commission on their approved investments</p>
          </div>
        </div>
        {referralCode ? (
          <>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-3">
              <span className="text-mea-red font-bold text-2xl tracking-[0.3em] flex-1">{referralCode}</span>
              <button onClick={copyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-xs font-medium transition-all cursor-pointer">
                {copied ? <CheckCircle size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            <p className="text-white/20 text-xs break-all font-mono">{referralLink}</p>
          </>
        ) : (
          <p className="text-white/30 text-sm">Your referral code will appear here once your account is approved.</p>
        )}
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <DollarSign size={18} className="text-green-400 mb-2" />
          <div className="text-xl font-bold text-white">{fmt(totalEarned)}</div>
          <div className="text-white/40 text-xs mt-0.5">Commission Paid</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Clock size={18} className="text-yellow-400 mb-2" />
          <div className="text-xl font-bold text-white">{fmt(totalPending)}</div>
          <div className="text-white/40 text-xs mt-0.5">Pending Commission</div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-white/50 text-sm font-medium mb-3">Commission History ({commissions.length})</h3>
        {commissions.length === 0 ? (
          <GlassCard className="p-10 text-center">
            <UserPlus size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No referral commissions yet.</p>
            <p className="text-white/20 text-xs mt-1">Share your referral link and earn when they invest.</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {[...commissions].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((c) => (
              <GlassCard key={c.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{c.referredUserName || 'Investor'}</div>
                    <div className="text-white/40 text-xs mt-0.5">
                      Investment: {fmt(c.investmentAmount)} · Rate: {c.commissionRate}%
                    </div>
                    <div className="text-white/25 text-xs mt-1">{c.createdAt?.toDate?.()?.toLocaleDateString()}</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <div className={`text-base font-bold ${c.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {fmt(c.commissionAmount)}
                    </div>
                    <Badge status={c.status} />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Support ── */
function SupportPage({ userId }) {
  const [form, setForm] = useState({ subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'support_tickets'), { userId, ...form, status: 'open', createdAt: serverTimestamp() })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Contact Support</h2>
      <GlassCard className="p-6">
        {sent ? (
          <div className="text-center py-6">
            <CheckCircle size={36} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Message Sent</h3>
            <p className="text-white/40 text-sm">Support will respond within 1 business day.</p>
            <button onClick={() => { setSent(false); setForm({ subject: '', message: '' }) }} className="btn-secondary text-sm mt-4">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Subject</label>
              <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What do you need help with?" className="input-field" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your issue or question..." className="input-field resize-none" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              <MessageSquare size={15} />{loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  )
}
