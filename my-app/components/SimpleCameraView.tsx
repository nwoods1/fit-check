// components/SimpleCameraView.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface SimpleCameraViewProps {
  styleName: string
  onCapture: (imageBase64: string) => void
  onBack: () => void
}

export default function SimpleCameraView({ styleName, onCapture, onBack }: SimpleCameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  const rafIdRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    let mounted = true

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
        })

        if (!mounted) {
          stream.getTracks().forEach(t => t.stop())
          return
        }

        streamRef.current = stream

        const video = videoRef.current
        if (!video) return

        video.srcObject = stream
        video.muted = true
        video.playsInline = true

        // IMPORTANT: force playback so frames actually appear
        await video.play()

        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setError('Failed to access camera. Please allow camera permissions.')
        setIsLoading(false)
      }
    }

    setup()

    return () => {
      mounted = false
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        canvas.width = video.videoWidth || 1280
        canvas.height = video.videoHeight || 720
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      rafIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [isLoading])

  function startCapture() {
    if (isLoading || countdown !== null) return
    setCountdown(3)

    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
          intervalRef.current = null
          window.setTimeout(capturePhoto, 0)
          return null
        }
        return (prev ?? 1) - 1
      })
    }, 1000)
  }

  function capturePhoto() {
    const canvas = canvasRef.current
    if (!canvas) return
    const image = canvas.toDataURL('image/jpeg', 0.9)
    window.setTimeout(() => onCapture(image), 0)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Camera Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={onBack} className="bg-purple-600 text-white px-6 py-3 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Style: <span className="text-purple-600">{styleName}</span>
            </h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 transition">
              ← Change Style
            </button>
          </div>
        </div>

        <div className="relative bg-black">
          <video ref={videoRef} className="hidden" />
          <canvas ref={canvasRef} className="w-full h-auto" />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading camera...</p>
              </div>
            </div>
          )}

          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-white text-9xl font-bold animate-pulse">{countdown}</div>
            </div>
          )}

          {!isLoading && countdown === null && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              Camera Ready
            </div>
          )}
        </div>

        <div className="bg-white rounded-b-lg p-6">
          <button
            onClick={startCapture}
            disabled={isLoading || countdown !== null}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {countdown !== null ? 'Get Ready...' : '📸 Capture My Outfit'}
          </button>
        </div>
      </div>
    </div>
  )
}
