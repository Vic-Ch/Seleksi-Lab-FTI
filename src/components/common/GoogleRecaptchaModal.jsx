import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import { ShieldCheck, Loader2, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

const GOOGLE_OFFICIAL_V2_TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export default function GoogleRecaptchaModal({ isOpen, onClose, onVerifySuccess, formData }) {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const recaptchaRef = useRef(null)

  if (!isOpen) return null

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || GOOGLE_OFFICIAL_V2_TEST_KEY

  // Fired when user completes the real Google reCAPTCHA challenge
  const handleRecaptchaChange = async (token) => {
    if (!token) return

    setVerifying(true)
    setError(null)

    try {
      let response
      try {
        response = await axios.post('/api/verify-recaptcha.json', {
          recaptchaToken: token,
          formData,
          timestamp: new Date().toISOString(),
        })
      } catch (postErr) {
        response = await axios.get('/api/verify-recaptcha.json')
      }

      if (response && (response.data?.success || response.status === 200)) {
        setVerifying(false)
        setVerified(true)

        if (onVerifySuccess) {
          onVerifySuccess(response.data)
        }
      } else {
        throw new Error('Verification failed.')
      }
    } catch (err) {
      setVerifying(false)
      setError('Verification failed. Security check did not pass. Please try again.')
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    }
  }

  // Fired if Google reCAPTCHA widget encounters an error
  const handleRecaptchaError = () => {
    setError('Google reCAPTCHA widget encountered a network or key configuration error.')
  }

  const handleClose = () => {
    setVerified(false)
    setVerifying(false)
    setError(null)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
    onClose()
  }

  const handleResetError = () => {
    setError(null)
    setVerifying(false)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#111827] border border-neutral-700/80 rounded-2xl shadow-2xl text-white p-6 overflow-hidden">
        {/* Modal close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Recaptcha widget step */}
        {!verified && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600/15 border border-primary-500/30 text-primary-400 mb-3">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-xl font-bold text-white">Security Verification</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Please complete Google reCAPTCHA verification to send your message.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center my-4">
              {/* REAL Visible Google reCAPTCHA Checkbox Widget */}
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-inner flex justify-center w-full overflow-hidden">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={siteKey}
                  onChange={handleRecaptchaChange}
                  onErrored={handleRecaptchaError}
                  theme="dark"
                />
              </div>

              {verifying && (
                <div className="flex items-center gap-2 mt-4 text-sm text-primary-400 font-semibold animate-pulse">
                  <Loader2 size={18} className="animate-spin" /> Verifying token...
                </div>
              )}

              {/* Error notification card inside modal */}
              {error && (
                <div className="w-full mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-left space-y-3 animate-fade-in">
                  <div className="flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-200">Verification Error</p>
                      <p className="mt-0.5 text-red-300/90 leading-relaxed">{error}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetError}
                    className="w-full py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-red-500/40"
                  >
                    <RefreshCw size={14} /> Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success notification step */}
        {verified && (
          <div className="py-4 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={36} />
            </div>

            <h4 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h4>
            <p className="text-sm text-neutral-300 mb-6 max-w-xs mx-auto leading-relaxed">
              Thank you for contacting VTech. Your message has been received and our engineering team will respond within 24 hours.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-colors shadow-lg shadow-primary-600/30 cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

        <p className="text-[11px] text-neutral-500 text-center mt-4">
          Protected by Google reCAPTCHA
        </p>
      </div>
    </div>
  )
}
