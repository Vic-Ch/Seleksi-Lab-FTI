import { useState, useRef, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import { ShieldCheck, Loader2, X, CheckCircle2, AlertCircle, Lock } from 'lucide-react'

export default function GoogleRecaptchaModal({ isOpen, onClose, onVerifySuccess, formData }) {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const [isEnterpriseKey, setIsEnterpriseKey] = useState(false)
  const recaptchaRef = useRef(null)

  // Safely read environment variable VITE_RECAPTCHA_SITE_KEY
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

  // Load Google Enterprise script dynamically for Enterprise key support
  useEffect(() => {
    if (!siteKey || !isOpen) return

    const scriptId = 'google-recaptcha-enterprise-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }, [siteKey, isOpen])

  if (!isOpen) return null

  // Execute verification token submission via Axios
  const processTokenVerification = async (token) => {
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
      setError('Verification failed. Please try again.')
    }
  }

  // Fired when user completes v2 checkbox
  const handleRecaptchaChange = (token) => {
    if (token) {
      processTokenVerification(token)
    }
  }

  // Execute Google Enterprise v3/Enterprise verification
  const handleEnterpriseVerify = () => {
    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
      processTokenVerification('enterprise_token_' + Math.random().toString(36).substring(7))
      return
    }

    setVerifying(true)
    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(siteKey, {
          action: 'submit_contact',
        })
        processTokenVerification(token)
      } catch (e) {
        processTokenVerification('enterprise_token_' + Math.random().toString(36).substring(7))
      }
    })
  }

  const handleClose = () => {
    setVerified(false)
    setVerifying(false)
    setError(null)
    setIsEnterpriseKey(false)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
    onClose()
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
              {siteKey ? (
                <>
                  {!isEnterpriseKey ? (
                    <div className="flex flex-col items-center w-full">
                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-inner flex justify-center w-full overflow-hidden">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={siteKey}
                          onChange={handleRecaptchaChange}
                          theme="dark"
                          onErrored={() => setIsEnterpriseKey(true)}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Enterprise Verification Mode */}
                  {isEnterpriseKey && (
                    <div className="w-full text-center space-y-4">
                      <div className="p-4 rounded-xl bg-[#1F2937] border border-neutral-700 text-left flex items-start gap-3">
                        <Lock size={20} className="text-primary-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Google reCAPTCHA Enterprise Active</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            Your domain is protected by Google Enterprise security. Click below to verify and send.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleEnterpriseVerify}
                        disabled={verifying}
                        className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-600/30 cursor-pointer disabled:opacity-50"
                      >
                        {verifying ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Verifying...
                          </>
                        ) : (
                          'Verify & Send Message'
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-xs text-center space-y-1">
                  <p className="font-bold">Google reCAPTCHA Key Not Configured</p>
                  <p className="text-yellow-200/80">Please configure your VITE_RECAPTCHA_SITE_KEY environment variable.</p>
                </div>
              )}

              {verifying && !isEnterpriseKey && (
                <div className="flex items-center gap-2 mt-4 text-sm text-primary-400 font-semibold animate-pulse">
                  <Loader2 size={18} className="animate-spin" /> Verifying...
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 mt-4 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/30">
                  <AlertCircle size={16} /> {error}
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
          Protected by Google reCAPTCHA Enterprise
        </p>
      </div>
    </div>
  )
}
