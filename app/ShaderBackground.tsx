'use client'

import { useEffect, useRef, useState } from 'react'

const VERTEX = `attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 resolution;
uniform float time;
const float rndc = 43758.5453123;

float rand(float n) { return fract(sin(n) * rndc); }
vec2 rand2(in vec2 p) { return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077))); }
float noise1(float p) { float fl = floor(p), fc = fract(p); return mix(rand(fl), rand(fl + 1.000004), fc); }

float voronoi(vec2 x) {
  vec2 p = floor(x), f = fract(x), res = vec2(8.0);
  for (int j = -1; j <= 1; j++)
    for (int i = -1; i <= 1; i++) {
      vec2 b = vec2(i, j), r = vec2(b) - f + rand2(p + b);
      float d = max(abs(r.x), abs(r.y));
      if (d < res.x) { res.y = res.x; res.x = d; } else if (d < res.y) { res.y = d; }
    }
  return res.y - res.x;
}

void main(void) {
  vec2 xy = gl_FragCoord.xy / resolution.xy;
  xy = (xy - 0.5) * 2.0;
  vec2 xy2 = xy;
  xy.x *= resolution.x / resolution.y;
  float v = 0.21 - length(xy) * 0.21;
  xy /= 0.6 + sin(time * 0.07) * 0.22;
  xy += time * 0.12;
  float a = 0.7, f = 1.0;
  for (int i = 0; i < 3; i++) {
    float v1 = voronoi(xy * f + 5.0);
    float v2 = 0.0;
    if (i > 0) {
      float va = 0.0, vb = 0.0;
      if (i == 1) {
        va = 1.0 - smoothstep(0.0, 0.12, v1);
        v2 = voronoi(xy * f * 0.5 / 5.0 + 8694.0 + time / 7.0);
        vb = 1.0 - smoothstep(0.0, 0.1, v2);
      } else {
        va = 1.0 - smoothstep(0.0, 0.1, v1);
        v2 = voronoi(xy * f * 0.5 + 50.0 + time / 5.0);
        vb = 1.0 - smoothstep(0.0, 0.03, v2);
      }
      v += a * pow(va * (0.5 + vb), 2.0);
    }
    v1 = 1.0 - smoothstep(0.0, 0.2, v1);
    v2 = mix(0.12, a * (noise1(v1 * 7.5 + 0.3)), sin(time / 7.0));
    if (i == 0) { v += v2; }
    f *= 3.0;
    a *= 0.7 + abs(sin(time / 3.0)) / 3.0;
  }
  v *= exp(-0.6 * length(xy2)) * 1.2;
  vec3 cexp = vec3(4.0, 1.5, 1.2) * 1.012;
  vec3 col = vec3(pow(abs(v), cexp.x), pow(abs(v), cexp.y), pow(abs(v), cexp.z)) * 4.0;
  gl_FragColor = vec4(col, 1.0);
}`

const STORAGE_KEY = 'bgfx'
const RENDER_SCALE = 0.5 // render at half resolution, the pattern is soft anyway

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null }
  return s
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [supported, setSupported] = useState(true)

  // initial preference: saved choice, otherwise on unless the visitor prefers reduced motion
  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem(STORAGE_KEY) } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(saved ? saved === 'on' : !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) { setSupported(false); return }
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const prog = gl.createProgram()
    if (!vs || !fs || !prog) { setSupported(false); return }
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setSupported(false); return }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW) // one big triangle
    const loc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'resolution')
    const uTime = gl.getUniformLocation(prog, 'time')

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * RENDER_SCALE))
      canvas.height = Math.max(1, Math.round(window.innerHeight * RENDER_SCALE))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const start = performance.now()
    const frame = () => {
      gl.uniform1f(uTime, 1 + (performance.now() - start) / 1000 * 0.6)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [enabled])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    setSupported(true)
    try { localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off') } catch {}
  }

  return (
    <>
      {enabled && supported && <canvas ref={canvasRef} className="shaderBg" aria-hidden="true" />}
      <button type="button" className="fxToggle" onClick={toggle} aria-pressed={enabled} title="Toggle animated background">
        <i className={enabled ? 'on' : ''} /> BG FX {enabled ? 'ON' : 'OFF'}
      </button>
    </>
  )
}
