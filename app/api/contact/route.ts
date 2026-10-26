import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TO = process.env.CONTACT_TO || 'vitaliipietukhov@gmail.com'
// Until a domain is verified in Resend, only onboarding@resend.dev works as sender
const FROM = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

// small per-instance limiter: 5 messages per 10 minutes per IP
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'too_many' }, { status: 429 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 }) }

  if (body.company) return NextResponse.json({ ok: true }) // honeypot: pretend success

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const plan = String(body.plan ?? '').trim()
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const subject = `Portfolio inquiry${plan ? ` — ${plan}` : ''} from ${name}`.slice(0, 200)
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}${plan ? `<br><b>Interest:</b> ${esc(plan)}` : ''}</p>
<p style="white-space:pre-wrap">${esc(message)}</p></div>`
  const text = `Name: ${name}\nEmail: ${email}${plan ? `\nInterest: ${plan}` : ''}\n\n${message}`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, html, text }),
    })
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text())
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Resend request failed', e)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
