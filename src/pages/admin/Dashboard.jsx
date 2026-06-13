import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrency } from '../../contexts/CurrencyContext'
import {
  collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, query, where
} from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase/config'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import {
  LayoutDashboard, Users, TrendingUp, DollarSign, FileText, Bell,
  Settings, LogOut, CheckCircle, X, Edit3, Trash2, Plus, Eye,
  Menu, Building2, ShieldCheck, AlertCircle, Download
} from 'lucide-react'

const MENU = [
  { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'plans', icon: TrendingUp, label: 'Investment Plans' },
  { id: 'investments', icon: DollarSign, label: 'Investments' },
  { id: 'receipts', icon: FileText, label: 'Receipts' },
  { id: 'withdrawals', icon: Download, label: 'Withdrawals' },
  { id: 'bank', icon: Building2, label: 'Bank Accounts' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'content', icon: Settings, label: 'Site Content' },
]

export default function AdminDashboard() {
  const { currentUser, userProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [page, setPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [investments, setInvestments] = useState([])
  const [plans, setPlans] = useState([])
  const [receipts, setReceipts] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])

  useEffect(() => {
    const unsubs = [
      onSnapshot(collection(db, 'users'), (s) => setUsers(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'investments'), (s) => setInvestments(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'investmentPlans'), (s) => setPlans(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'receipts'), (s) => setReceipts(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'withdrawals'), (s) => setWithdrawals(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'bankAccounts'), (s) => setBankAccounts(s.docs.map((d) => ({ id: d.id, ...d.data() })))),
    ]
    return () => unsubs.forEach((u) => u())
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  function NavItem({ item }) {
    const Icon = item.icon
    const isActive = page === item.id
    return (
      <button onClick={() => { setPage(item.id); setSidebarOpen(false) }}
        className={`sidebar-item w-full text-left ${isActive ? 'active' : ''}`}>
        <Icon size={17} className={isActive ? 'text-mea-red' : 'text-white/40 group-hover:text-white/70'} />
        <span className="text-sm">{item.label}</span>
      </button>
    )
  }

  const stats = {
    totalUsers: users.filter((u) => u.role !== 'admin').length,
    pendingUsers: users.filter((u) => u.status === 'pending').length,
    activeInvestments: investments.filter((i) => i.status === 'active').length,
    pendingReceipts: receipts.filter((r) => r.status === 'pending').length,
    totalCapital: investments.reduce((s, i) => s + (i.amount || 0), 0),
    pendingWithdrawals: withdrawals.filter((w) => w.status === 'pending').length,
  }

  return (
    <div className="min-h-screen bg-mea-black flex">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-mea-deep border-r border-white/5 flex flex-col
        transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-gradient flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
            <span className="text-white font-bold text-base">MEA <span className="text-mea-red">Admin</span></span>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-mea-red/10 border border-mea-red/20">
            <ShieldCheck size={10} className="text-mea-red" />
            <span className="text-mea-red text-xs font-semibold">Admin Portal</span>
          </div>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
            <div className="w-9 h-9 rounded-full bg-mea-red/20 border border-mea-red/30 flex items-center justify-center flex-shrink-0">
              <span className="text-mea-red font-bold text-sm">A</span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{userProfile?.displayName || 'Admin'}</div>
              <div className="text-white/30 text-xs truncate">{currentUser?.email}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-0.5">
          {MENU.map((item) => <NavItem key={item.id} item={item} />)}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button onClick={handleLogout} className="sidebar-item w-full text-left text-white/40 hover:text-red-400">
            <LogOut size={17} /><span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 bg-mea-black/80 backdrop-blur-md border-b border-white/5">
          <button className="lg:hidden btn-ghost p-1.5" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold">{MENU.find((m) => m.id === page)?.label}</h1>
          </div>
          {stats.pendingReceipts > 0 && (
            <span className="flex items-center gap-1.5 text-yellow-400 text-xs px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/15">
              <AlertCircle size={12} />{stats.pendingReceipts} pending receipts
            </span>
          )}
        </header>

        <div className="flex-1 overflow-auto p-5 lg:p-7">
          {page === 'overview' && <AdminOverview stats={stats} setPage={setPage} investments={investments} users={users} />}
          {page === 'users' && <ManageUsers users={users} />}
          {page === 'plans' && <ManagePlans plans={plans} />}
          {page === 'investments' && <ManageInvestments investments={investments} users={users} />}
          {page === 'receipts' && <ManageReceipts receipts={receipts} investments={investments} users={users} />}
          {page === 'withdrawals' && <ManageWithdrawals withdrawals={withdrawals} users={users} />}
          {page === 'bank' && <ManageBankAccounts bankAccounts={bankAccounts} />}
          {page === 'notifications' && <SendNotifications users={users} />}
          {page === 'content' && <SiteContent />}
        </div>
      </main>
    </div>
  )
}

/* ── Overview ── */
function AdminOverview({ stats, setPage, investments, users }) {
  const { fmt } = useCurrency()
  const cards = [
    { label: 'Total Users', value: stats.totalUsers, sub: `${stats.pendingUsers} pending approval`, icon: Users, color: 'text-blue-400', page: 'users' },
    { label: 'Active Investments', value: stats.activeInvestments, sub: 'Currently running', icon: TrendingUp, color: 'text-green-400', page: 'investments' },
    { label: 'Total Capital', value: fmt(stats.totalCapital), sub: 'All investments', icon: DollarSign, color: 'text-mea-red', page: 'investments' },
    { label: 'Pending Receipts', value: stats.pendingReceipts, sub: 'Awaiting verification', icon: FileText, color: 'text-yellow-400', page: 'receipts' },
    { label: 'Pending Withdrawals', value: stats.pendingWithdrawals, sub: 'Awaiting processing', icon: Download, color: 'text-orange-400', page: 'withdrawals' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(({ label, value, sub, icon: Icon, color, page }) => (
          <button key={label} onClick={() => setPage(page)} className="text-left cursor-pointer">
            <GlassCard hover className="p-5">
              <Icon size={18} className={`${color} mb-3`} />
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-white/50 text-xs font-medium">{label}</div>
              <div className="text-white/25 text-xs mt-0.5">{sub}</div>
            </GlassCard>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-white font-semibold mb-4">Recent Investments</h2>
          <div className="space-y-2">
            {investments.slice(0, 6).map((inv) => {
              const user = users.find((u) => u.uid === inv.userId)
              return (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <div>
                    <div className="text-white text-sm">{user?.displayName || 'Unknown'}</div>
                    <div className="text-white/30 text-xs">{inv.planName} · {fmt(inv.amount)}</div>
                  </div>
                  <Badge status={inv.status} />
                </div>
              )
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-white font-semibold mb-4">Recent Users</h2>
          <div className="space-y-2">
            {users.filter((u) => u.role !== 'admin').slice(0, 6).map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-mea-red/15 flex items-center justify-center text-xs font-bold text-mea-red">
                    {u.displayName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white text-sm">{u.displayName}</div>
                    <div className="text-white/30 text-xs">{u.email}</div>
                  </div>
                </div>
                <Badge status={u.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

/* ── Manage Users ── */
function ManageUsers({ users }) {
  const investors = users.filter((u) => u.role !== 'admin')

  async function updateStatus(id, status) {
    await updateDoc(doc(db, 'users', id), { status, updatedAt: serverTimestamp() })
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Manage Users ({investors.length})</h2>
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Name', 'Email', 'Phone', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investors.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="px-4 py-3 text-white text-sm font-medium">{u.displayName}</td>
                  <td className="px-4 py-3 text-white/50 text-sm">{u.email}</td>
                  <td className="px-4 py-3 text-white/40 text-sm">{u.phone || '—'}</td>
                  <td className="px-4 py-3"><Badge status={u.status} /></td>
                  <td className="px-4 py-3 text-white/30 text-xs">{u.createdAt?.toDate?.()?.toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {u.status !== 'approved' && (
                        <button onClick={() => updateStatus(u.id, 'approved')}
                          className="text-xs px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/20 text-green-400 hover:bg-green-500/25 cursor-pointer transition-colors">
                          Approve
                        </button>
                      )}
                      {u.status !== 'rejected' && (
                        <button onClick={() => updateStatus(u.id, 'rejected')}
                          className="text-xs px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 cursor-pointer transition-colors">
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

/* ── Manage Plans ── */
function ManagePlans({ plans }) {
  const { fmt } = useCurrency()
  const [showForm, setShowForm] = useState(false)
  const [editPlan, setEditPlan] = useState(null)
  const [form, setForm] = useState({ name: '', type: 'monthly', minAmount: '', returnRate: '', duration: '', active: true })
  const [loading, setLoading] = useState(false)

  function openEdit(plan) {
    setEditPlan(plan)
    setForm({ name: plan.name, type: plan.type, minAmount: plan.minAmount, returnRate: plan.returnRate, duration: plan.duration, active: plan.active })
    setShowForm(true)
  }

  function openNew() {
    setEditPlan(null)
    setForm({ name: '', type: 'monthly', minAmount: '', returnRate: '', duration: '', active: true })
    setShowForm(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { ...form, minAmount: parseFloat(form.minAmount), returnRate: parseFloat(form.returnRate), updatedAt: serverTimestamp() }
      if (editPlan) {
        await updateDoc(doc(db, 'investmentPlans', editPlan.id), data)
      } else {
        await addDoc(collection(db, 'investmentPlans'), { ...data, createdAt: serverTimestamp() })
      }
      setShowForm(false)
    } finally {
      setLoading(false)
    }
  }

  async function deletePlan(id) {
    if (!confirm('Delete this plan?')) return
    await deleteDoc(doc(db, 'investmentPlans', id))
  }

  async function toggleActive(plan) {
    await updateDoc(doc(db, 'investmentPlans', plan.id), { active: !plan.active })
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold text-lg">Investment Plans ({plans.length})</h2>
        <button onClick={openNew} className="btn-primary text-sm px-4 py-2">
          <Plus size={15} />Add Plan
        </button>
      </div>

      {showForm && (
        <GlassCard className="p-6 mb-5 border-mea-red/20">
          <h3 className="text-white font-semibold mb-4">{editPlan ? 'Edit Plan' : 'New Plan'}</h3>
          <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Plan Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Monthly Growth" className="input-field" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Minimum Amount (USD)</label>
              <input required type="number" value={form.minAmount} onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
                placeholder="e.g. 1000" className="input-field" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Return Rate (%)</label>
              <input required type="number" step="0.1" value={form.returnRate} onChange={(e) => setForm({ ...form, returnRate: e.target.value })}
                placeholder="e.g. 5.5" className="input-field" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Duration</label>
              <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 3–6 Months" className="input-field" />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 accent-mea-red" />
                <span className="text-white/50 text-sm">Active</span>
              </label>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">{loading ? 'Saving...' : 'Save Plan'}</button>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <GlassCard key={plan.id} className={`p-5 ${!plan.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-semibold">{plan.name}</div>
                <div className="text-mea-red text-sm">{plan.returnRate}% · {plan.type}</div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(plan)} className="btn-ghost p-1.5 text-white/40 hover:text-white"><Edit3 size={14} /></button>
                <button onClick={() => deletePlan(plan.id)} className="btn-ghost p-1.5 text-white/40 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="text-white/40 text-xs space-y-1">
              <div>Min: {fmt(plan.minAmount)}</div>
              <div>Duration: {plan.duration}</div>
            </div>
            <button onClick={() => toggleActive(plan)}
              className={`mt-3 text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                plan.active ? 'border-green-500/20 text-green-400 bg-green-500/10 hover:bg-green-500/20' : 'border-white/10 text-white/30 hover:border-white/20'
              }`}>
              {plan.active ? 'Active' : 'Inactive'}
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

/* ── Manage Investments ── */
function ManageInvestments({ investments, users }) {
  const { fmt } = useCurrency()
  const statuses = ['pending_payment','receipt_uploaded','under_verification','approved','rejected','active','completed','withdrawal_requested','closed']

  async function updateStatus(id, status) {
    await updateDoc(doc(db, 'investments', id), { status, updatedAt: serverTimestamp() })
  }

  async function updateReturnRate(id, rate) {
    const r = parseFloat(rate)
    const inv = investments.find((i) => i.id === id)
    if (!inv || isNaN(r)) return
    await updateDoc(doc(db, 'investments', id), {
      returnRate: r,
      projectedReturn: inv.amount * (r / 100),
      updatedAt: serverTimestamp(),
    })
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">All Investments ({investments.length})</h2>
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5">
                {['Investor', 'Plan', 'Amount', 'Return %', 'Projected', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => {
                const user = users.find((u) => u.uid === inv.userId)
                return (
                  <tr key={inv.id} className="table-row">
                    <td className="px-4 py-3 text-white text-sm">{user?.displayName || 'Unknown'}</td>
                    <td className="px-4 py-3 text-white/60 text-sm">{inv.planName}</td>
                    <td className="px-4 py-3 text-white text-sm font-medium">{fmt(inv.amount)}</td>
                    <td className="px-4 py-3">
                      <input type="number" defaultValue={inv.returnRate} step="0.1"
                        onBlur={(e) => updateReturnRate(inv.id, e.target.value)}
                        className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:border-mea-red focus:outline-none" />
                      <span className="text-white/40 text-xs ml-1">%</span>
                    </td>
                    <td className="px-4 py-3 text-green-400 text-sm">{fmt(inv.projectedReturn || 0)}</td>
                    <td className="px-4 py-3"><Badge status={inv.status} /></td>
                    <td className="px-4 py-3">
                      <select value={inv.status} onChange={(e) => updateStatus(inv.id, e.target.value)}
                        className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1.5 focus:border-mea-red focus:outline-none cursor-pointer">
                        {statuses.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

/* ── Manage Receipts ── */
function ManageReceipts({ receipts, investments, users }) {
  const { fmt } = useCurrency()
  async function approveReceipt(receipt) {
    await updateDoc(doc(db, 'receipts', receipt.id), { status: 'approved', reviewedAt: serverTimestamp() })
    await updateDoc(doc(db, 'investments', receipt.investmentId), { status: 'under_verification', updatedAt: serverTimestamp() })
  }
  async function rejectReceipt(id) {
    await updateDoc(doc(db, 'receipts', id), { status: 'rejected', reviewedAt: serverTimestamp() })
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Transfer Receipts ({receipts.length})</h2>
      <div className="space-y-4">
        {receipts.length === 0 ? (
          <GlassCard className="p-12 text-center"><p className="text-white/30">No receipts submitted yet.</p></GlassCard>
        ) : receipts.map((r) => {
          const inv = investments.find((i) => i.id === r.investmentId)
          const user = users.find((u) => u.uid === r.userId)
          return (
            <GlassCard key={r.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{user?.displayName || 'Unknown'}</div>
                  <div className="text-white/40 text-sm">{inv?.planName} · {fmt(inv?.amount)}</div>
                  <div className="text-white/30 text-xs mt-1">Uploaded: {r.uploadedAt?.toDate?.()?.toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={r.status} />
                  {r.fileUrl && (
                    <a href={r.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-ghost text-xs py-1.5 px-3"><Eye size={12} />View</a>
                  )}
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => approveReceipt(r)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/20 text-green-400 hover:bg-green-500/25 cursor-pointer transition-colors">
                        Approve
                      </button>
                      <button onClick={() => rejectReceipt(r.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 cursor-pointer transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}

/* ── Manage Withdrawals ── */
function ManageWithdrawals({ withdrawals, users }) {
  const { fmt } = useCurrency()
  async function processWithdrawal(id, status) {
    await updateDoc(doc(db, 'withdrawals', id), { status, processedAt: serverTimestamp() })
    if (status === 'approved') {
      const w = withdrawals.find((w) => w.id === id)
      if (w?.investmentId) {
        await updateDoc(doc(db, 'investments', w.investmentId), { status: 'closed', updatedAt: serverTimestamp() })
      }
    }
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Withdrawals ({withdrawals.length})</h2>
      <div className="space-y-4">
        {withdrawals.length === 0 ? (
          <GlassCard className="p-12 text-center"><p className="text-white/30">No withdrawal requests yet.</p></GlassCard>
        ) : withdrawals.map((w) => {
          const user = users.find((u) => u.uid === w.userId)
          return (
            <GlassCard key={w.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="text-white font-medium">{user?.displayName || 'Unknown'}</div>
                  <div className="text-white/40 text-sm">Amount: {fmt(w.investmentAmount)} + Projected Return: {fmt(w.projectedReturn)}</div>
                  {w.notes && <div className="text-white/30 text-xs mt-1">Notes: {w.notes}</div>}
                  <div className="text-white/25 text-xs mt-1">{w.requestedAt?.toDate?.()?.toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={w.status} />
                  {w.status === 'pending' && (
                    <>
                      <button onClick={() => processWithdrawal(w.id, 'approved')}
                        className="text-xs px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/20 text-green-400 hover:bg-green-500/25 cursor-pointer transition-colors">
                        Approve
                      </button>
                      <button onClick={() => processWithdrawal(w.id, 'rejected')}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 cursor-pointer transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}

/* ── Bank Accounts ── */
function ManageBankAccounts({ bankAccounts }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ bankName: '', accountName: '', accountNumber: '', swift: '', iban: '', currency: 'USD', active: true })
  const [loading, setLoading] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'bankAccounts'), { ...form, createdAt: serverTimestamp() })
      setShowForm(false)
      setForm({ bankName: '', accountName: '', accountNumber: '', swift: '', iban: '', currency: 'USD', active: true })
    } finally {
      setLoading(false)
    }
  }

  async function toggleActive(account) {
    await updateDoc(doc(db, 'bankAccounts', account.id), { active: !account.active })
  }

  async function deleteAccount(id) {
    if (!confirm('Delete this bank account?')) return
    await deleteDoc(doc(db, 'bankAccounts', id))
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold text-lg">Bank Accounts</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm px-4 py-2">
          <Plus size={15} />Add Account
        </button>
      </div>

      {showForm && (
        <GlassCard className="p-6 mb-5 border-mea-red/20">
          <h3 className="text-white font-semibold mb-4">Add Bank Account</h3>
          <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-4">
            {[
              ['bankName', 'Bank Name', 'e.g. Emirates NBD'],
              ['accountName', 'Account Name', 'e.g. MEA Investment LLC'],
              ['accountNumber', 'Account Number', ''],
              ['swift', 'SWIFT Code', ''],
              ['iban', 'IBAN', ''],
              ['currency', 'Currency', 'USD'],
            ].map(([key, label, placeholder]) => (
              <div key={key}>
                <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
                <input required value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} className="input-field" />
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">{loading ? 'Saving...' : 'Save Account'}</button>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {bankAccounts.map((acc) => (
          <GlassCard key={acc.id} className={`p-5 ${!acc.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-semibold">{acc.bankName}</div>
                <div className="text-mea-red text-xs">{acc.currency}</div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => toggleActive(acc)}
                  className={`text-xs px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${acc.active ? 'border-green-500/20 text-green-400' : 'border-white/10 text-white/30'}`}>
                  {acc.active ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => deleteAccount(acc.id)} className="btn-ghost p-1.5 text-white/30 hover:text-red-400"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-white/50">
              <div><span className="text-white/25">Name:</span> {acc.accountName}</div>
              <div className="font-mono"><span className="text-white/25">Acc:</span> {acc.accountNumber}</div>
              <div className="font-mono"><span className="text-white/25">SWIFT:</span> {acc.swift}</div>
              {acc.iban && <div className="font-mono"><span className="text-white/25">IBAN:</span> {acc.iban}</div>}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

/* ── Send Notifications ── */
function SendNotifications({ users }) {
  const [form, setForm] = useState({ title: '', message: '', targetType: 'all', userId: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const investors = users.filter((u) => u.role !== 'admin')
      const targets = form.targetType === 'all' ? investors : investors.filter((u) => u.uid === form.userId)
      await Promise.all(targets.map((u) =>
        addDoc(collection(db, 'notifications'), {
          userId: u.uid, title: form.title, message: form.message,
          read: false, createdAt: serverTimestamp(),
        })
      ))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setForm({ title: '', message: '', targetType: 'all', userId: '' })
    } finally {
      setLoading(false)
    }
  }

  const investors = users.filter((u) => u.role !== 'admin')

  return (
    <div className="max-w-lg animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Send Notification</h2>
      <GlassCard className="p-6">
        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/15">
            <CheckCircle size={15} />Notification sent successfully.
          </div>
        )}
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Send To</label>
            <select value={form.targetType} onChange={(e) => setForm({ ...form, targetType: e.target.value })} className="input-field">
              <option value="all">All Users</option>
              <option value="specific">Specific User</option>
            </select>
          </div>
          {form.targetType === 'specific' && (
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Select User</label>
              <select value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} className="input-field">
                <option value="">Choose user...</option>
                {investors.map((u) => <option key={u.id} value={u.uid}>{u.displayName} ({u.email})</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Notification title" className="input-field" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Message</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Notification message..." className="input-field resize-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
            <Bell size={15} />{loading ? 'Sending...' : 'Send Notification'}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}

/* ── Site Content ── */
function SiteContent() {
  const [content, setContent] = useState({ heroTitle: '', heroSubtitle: '', aboutText: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'siteContent', 'main'), (snap) => {
      if (snap.exists()) setContent(snap.data())
    })
    return unsub
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await updateDoc(doc(db, 'siteContent', 'main'), { ...content, updatedAt: serverTimestamp() })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <h2 className="text-white font-semibold text-lg mb-5">Website Content</h2>
      <GlassCard className="p-6">
        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/15">
            <CheckCircle size={15} />Content saved successfully.
          </div>
        )}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Hero Title</label>
            <input value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              placeholder="Landing page hero title" className="input-field" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Hero Subtitle</label>
            <textarea rows={3} value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              placeholder="Landing page hero subtitle" className="input-field resize-none" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">About Page Text</label>
            <textarea rows={5} value={content.aboutText} onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
              placeholder="About page main content" className="input-field resize-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}
