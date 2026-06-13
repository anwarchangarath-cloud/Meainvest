import { Link } from 'react-router-dom'
import { UserPlus, Search, Building2, CreditCard, Upload, CheckCircle, TrendingUp, DollarSign, ArrowRight, ShieldCheck, FileText } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

const steps = [
  {
    num: 1,
    icon: UserPlus,
    title: 'Register Your Account',
    desc: 'Create your investor account with your personal details. Our admin team reviews and approves your profile before you can invest.',
    details: ['Provide full name, email, phone', 'Identity verification process', 'Admin approval required', 'Receive account activation confirmation'],
  },
  {
    num: 2,
    icon: Search,
    title: 'Select an Investment Plan',
    desc: 'Browse monthly and yearly investment plans. Choose the one that fits your capital and timeline.',
    details: ['Compare monthly vs. yearly plans', 'View projected return rates', 'Check minimum investment amounts', 'Review investment terms'],
  },
  {
    num: 3,
    icon: Building2,
    title: 'View Bank Account Details',
    desc: 'After selecting a plan, the app displays the company bank account details for your transfer.',
    details: ['Bank name and account number', 'SWIFT/IBAN code displayed', 'Transfer reference instructions', 'Multiple currency support'],
  },
  {
    num: 4,
    icon: CreditCard,
    title: 'Make the Bank Transfer',
    desc: 'Transfer your investment amount to the company bank account from your bank.',
    details: ['Use the reference number provided', 'Transfer exact amount specified', 'Keep your bank receipt', 'Transfer can take 1–3 business days'],
  },
  {
    num: 5,
    icon: Upload,
    title: 'Upload Your Receipt',
    desc: 'Upload a clear photo or scan of your bank transfer receipt through the app.',
    details: ['Accepted: JPG, PNG, PDF', 'Clear image required', 'Include all transfer details', 'Submission triggers verification'],
  },
  {
    num: 6,
    icon: CheckCircle,
    title: 'Admin Verification',
    desc: 'Our admin team verifies your receipt against our bank records. This typically takes 1–3 business days.',
    details: ['Receipt matched to bank statement', 'Amount and date verified', 'Identity cross-checked', 'You receive notification on status'],
  },
  {
    num: 7,
    icon: TrendingUp,
    title: 'Investment Activated',
    desc: 'Once approved, your investment becomes active in your dashboard with projected return tracking.',
    details: ['Investment status turns Active', 'Projected return rate shown', 'Start date and end date visible', 'Monthly/yearly update cycle begins'],
  },
  {
    num: 8,
    icon: DollarSign,
    title: 'Returns & Withdrawal',
    desc: 'At the end of your investment term, submit a withdrawal request to receive your capital and projected returns.',
    details: ['Submit withdrawal request', 'Admin processes the payout', 'Returns as per investment agreement', 'Funds transferred to your account'],
  },
]

const statuses = [
  { status: 'Pending Payment', color: 'text-yellow-400', desc: 'Investment created, awaiting your bank transfer.' },
  { status: 'Receipt Uploaded', color: 'text-blue-400', desc: 'Receipt submitted, pending admin verification.' },
  { status: 'Under Verification', color: 'text-orange-400', desc: 'Admin is reviewing your transfer receipt.' },
  { status: 'Approved', color: 'text-green-400', desc: 'Payment verified and approved by admin.' },
  { status: 'Active', color: 'text-emerald-400', desc: 'Investment is live and generating projected returns.' },
  { status: 'Completed', color: 'text-purple-400', desc: 'Investment term ended, withdrawal available.' },
  { status: 'Withdrawal Requested', color: 'text-amber-400', desc: 'Payout request submitted to admin.' },
  { status: 'Closed', color: 'text-white/40', desc: 'Investment fully settled and closed.' },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-mea-black pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-mea-red/5 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="section-label mb-4 block">The Process</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            How MEA Investment Works
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            A transparent, step-by-step investment process from account creation to returns. No complexity, just clarity.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map(({ num, icon: Icon, title, desc, details }, i) => (
              <GlassCard key={num} className="p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center">
                      <Icon size={18} className="text-mea-red" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block w-px h-full bg-gradient-to-b from-mea-red/20 to-transparent mt-10 ml-5 absolute" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-mea-red/50 text-xs font-bold tracking-widest">STEP {num}</span>
                      <h3 className="text-white font-semibold text-lg">{title}</h3>
                    </div>
                    <p className="text-white/50 mb-4 leading-relaxed">{desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-white/40 text-sm">
                          <span className="w-1 h-1 rounded-full bg-mea-red flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Status Guide */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block">Status Guide</span>
            <h2 className="text-3xl font-bold text-white mb-3">Investment Statuses Explained</h2>
            <p className="text-white/40">Track the lifecycle of every investment through clear status updates.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statuses.map(({ status, color, desc }) => (
              <GlassCard key={status} className="p-5">
                <div className={`text-sm font-semibold mb-2 ${color}`}>{status}</div>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard red className="p-7 flex flex-col sm:flex-row items-start gap-4">
            <ShieldCheck size={24} className="text-mea-red flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">Security & Compliance</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                All investment activities are verified by our compliance team. Receipts are cross-checked with our bank records before any investment is activated. Projected returns are subject to investment agreements and applicable regulatory requirements.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Begin?</h2>
          <p className="text-white/40 mb-8">Create your account and start your investment journey today.</p>
          <Link to="/register" className="btn-primary px-8 py-4">
            Create Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
