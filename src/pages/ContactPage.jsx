import { useState } from 'react'
import { MapPin, Mail, Phone, Send } from 'lucide-react'
import BlurText from '../components/reactbits/BlurText'
import FadeContent from '../components/reactbits/FadeContent'
import GradientText from '../components/reactbits/GradientText'
import AuroraBackground from '../components/reactbits/AuroraBackground'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import ContactInfoCard from '../components/cards/ContactInfoCard'
import GoogleRecaptchaModal from '../components/common/GoogleRecaptchaModal'

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Pacific Century Place, SCBD, Jakarta 12190',
    color: 'primary',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@vtech.com',
    color: 'secondary',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+62 (21) 555-8899',
    color: 'accent',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [showRecaptcha, setShowRecaptcha] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Trigger reCAPTCHA modal
    setShowRecaptcha(true)
  }

  const handleVerifySuccess = () => {
    // Reset form fields after captcha verification
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="overflow-hidden bg-[#0B0F19]">
      {/* ReCAPTCHA verification modal */}
      <GoogleRecaptchaModal
        isOpen={showRecaptcha}
        onClose={() => setShowRecaptcha(false)}
        onVerifySuccess={handleVerifySuccess}
        formData={formData}
      />

      {/* Contact hero section */}
      <AuroraBackground className="py-24 px-6">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <FadeContent direction="down" distance={20} duration={0.5}>
            <Badge icon={Send} className="mb-6">
              Get In Touch
            </Badge>
          </FadeContent>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight text-white">
            <BlurText
              text="Let's Build Something"
              className="justify-center text-4xl md:text-6xl font-bold tracking-tight text-white"
              delay={100}
              animateBy="words"
              direction="bottom"
            />
            <span className="block mt-2">
              <GradientText
                className="text-4xl md:text-6xl font-bold tracking-tight"
                colors={['#60A5FA', '#06B6D4', '#818CF8', '#60A5FA']}
                animationSpeed={6}
              >
                Extraordinary
              </GradientText>
            </span>
          </h1>

          <FadeContent direction="up" distance={20} delay={0.4}>
            <p className="text-lg text-neutral-300 max-w-xl mx-auto">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </FadeContent>
        </div>
      </AuroraBackground>

      {/* Contact form section */}
      <section className="py-24 px-6 bg-[#0B0F19] border-t border-neutral-800/80">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form column */}
          <FadeContent direction="left" distance={50} blur className="lg:col-span-3">
            <div className="bg-[#111827]/90 rounded-2xl p-8 md:p-10 shadow-2xl border border-neutral-800 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-neutral-400 mb-8">Fill out the form below and our engineering team will get back to you within 24 hours.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <FormField
                  label="Subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />

                <FormField
                  label="Message"
                  id="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  required
                />

                <Button type="submit" variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-primary-600/30">
                  <Send size={18} /> Send Message
                </Button>
              </form>
            </div>
          </FadeContent>

          {/* Info cards column */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            {CONTACT_INFO.map((info, idx) => (
              <ContactInfoCard
                key={info.label}
                icon={info.icon}
                label={info.label}
                value={info.value}
                color={info.color}
                delay={idx * 0.15}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
