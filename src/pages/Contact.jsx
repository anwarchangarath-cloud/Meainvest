import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@meainvestment.com', href: 'mailto:info@meainvestment.com' },
  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
  { icon: MapPin, label: 'Region', value: 'Middle East & Africa', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9AM–6PM GMT', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-mea-black pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-mea-red/5 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="section-label mb-4 block">Get In Touch</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">Contact Us</h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Have questions about our investment plans? Our team is here to help you make informed decisions.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <GlassCard key={label} className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-mea-red" />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-white text-sm font-medium hover:text-mea-red transition-colors cursor-pointer">
                        {value}
                      </a>
                    ) : (
                      <div className="text-white text-sm font-medium">{value}</div>
                    )}
                  </div>
                </GlassCard>
              ))}

              <GlassCard red className="p-6 mt-6">
                <h3 className="text-white font-semibold mb-2 text-sm">Investor Support</h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Existing investors can also contact support through the User Dashboard for faster response. All inquiries are handled within 1 business day.
                </p>
              </GlassCard>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <GlassCard className="p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-white/40 text-sm max-w-xs">
                      Thank you for reaching out. Our team will get back to you within 1 business day.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="mt-6 btn-secondary text-sm"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-white font-bold text-xl mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/50 text-xs mb-1.5 block" htmlFor="name">Full Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="text-white/50 text-xs mb-1.5 block" htmlFor="email">Email Address</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="input-field"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block" htmlFor="subject">Subject</label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block" htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          className="input-field resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3.5 disabled:opacity-60"
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                        {!loading && <Send size={16} />}
                      </button>
                    </form>
                  </>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
