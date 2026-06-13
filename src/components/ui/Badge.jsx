const statusConfig = {
  'pending_payment':     { label: 'Pending Payment',     color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' },
  'receipt_uploaded':    { label: 'Receipt Uploaded',    color: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  'under_verification':  { label: 'Under Verification',  color: 'bg-orange-500/15 text-orange-400 border-orange-500/20' },
  'approved':            { label: 'Approved',            color: 'bg-green-500/15 text-green-400 border-green-500/20' },
  'rejected':            { label: 'Rejected',            color: 'bg-red-500/15 text-red-400 border-red-500/20' },
  'active':              { label: 'Active',              color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
  'completed':           { label: 'Completed',           color: 'bg-purple-500/15 text-purple-400 border-purple-500/20' },
  'withdrawal_requested':{ label: 'Withdrawal Requested',color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  'closed':              { label: 'Closed',              color: 'bg-white/5 text-white/40 border-white/10' },
  'pending':             { label: 'Pending',             color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' },
}

export default function Badge({ status, className = '' }) {
  const config = statusConfig[status?.toLowerCase().replace(/\s+/g, '_')] || {
    label: status,
    color: 'bg-white/5 text-white/60 border-white/10',
  }
  return (
    <span className={`status-badge border ${config.color} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  )
}
