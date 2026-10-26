'use client'

import { FormEvent, useState } from 'react'
import { contact } from './data'

type Props = { plan: string; message: string; setMessage: (v: string) => void }

export default function ContactForm({ plan, message, setMessage }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'fallback' | 'limited'>('idle')

  const mailto = (d: FormData) => {
    const subject = encodeURIComponent(`Project inquiry${plan ? ` — ${plan}` : ''}`)
    const body = encodeURIComponent(`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`)
    return `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (res.status === 429) { setState('limited'); return }
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setMessage('')
      setState('sent')
    } catch {
      // server unavailable or not configured: hand the message over to the visitor's mail app
      setState('fallback')
      window.location.href = mailto(data)
    }
  }

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <input type="hidden" name="plan" value={plan} readOnly />
      <label>NAME<input name="name" required minLength={2} autoComplete="name" /></label>
      <label>EMAIL<input name="email" type="email" required autoComplete="email" /></label>
      {plan && <div className="planTag">SELECTED: {plan}</div>}
      <label>PROJECT<textarea id="message" name="message" required minLength={10} rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="What do you want to launch?" /></label>
      <button className="primaryBtn" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'SENDING…' : 'SEND MESSAGE'} <span>↗</span>
      </button>
      <p className="formNote" role="status" aria-live="polite">
        {state === 'sent' && 'Thank you! Your message was sent — I will reply soon.'}
        {state === 'fallback' && 'Could not send directly — your mail app should open with the message ready to send.'}
        {state === 'limited' && 'Too many messages in a short time. Please try again in a few minutes or write to me on Telegram.'}
      </p>
    </form>
  )
}
