'use client'

import { FormEvent, useState } from 'react'
import { contact } from './data'

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT

type Props = { plan: string; message: string; setMessage: (v: string) => void }

export default function ContactForm({ plan, message, setMessage }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const mailto = (d: FormData) => {
    const subject = encodeURIComponent(`Project inquiry${plan ? ` — ${plan}` : ''}`)
    const body = encodeURIComponent(`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`)
    return `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company')) return // honeypot
    if (!ENDPOINT) {
      window.location.href = mailto(data)
      setState('sent')
      return
    }
    setState('sending')
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error('bad status')
      form.reset()
      setMessage('')
      setState('sent')
    } catch {
      setState('error')
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
        {state === 'sent' && (ENDPOINT ? 'Thank you! Your message was sent — I will reply soon.' : 'Your mail app should open with the message ready to send.')}
        {state === 'error' && 'Could not send directly — opening your mail app instead.'}
      </p>
    </form>
  )
}
