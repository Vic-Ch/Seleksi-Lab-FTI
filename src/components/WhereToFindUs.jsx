import { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck } from 'lucide-react'
import FadeContent from './reactbits/FadeContent'
import Button from './ui/Button'

export default function WhereToFindUs() {
  const [locationData, setLocationData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('/api/location.json')
        setLocationData(response.data)
      } catch (err) {
        setLocationData({
          company: 'VTech Innovation Tower',
          tagline: 'Global Technology & Engineering Hub',
          address: 'Pacific Century Place, Lt. 38, SCBD, Jakarta 12190',
          phone: '+62 (21) 555-8899',
          email: 'contact@vtech.com',
          hours: {
            mon_fri: '08:00 - 18:00 WIB',
            support: '24/7 Enterprise Emergency Support',
          },
          status: 'Office Open',
          mapEmbedUrl:
            'https://maps.google.com/maps?q=-6.2253,106.8086+(VTech+Enterprise+Headquarters)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLocationData()
  }, [])

  if (loading) {
    return (
      <div className="py-24 text-center text-neutral-400 bg-[#0B0F19]">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading location information...</p>
      </div>
    )
  }

  const info = locationData

  return (
    <section id="location" className="relative py-32 px-6 bg-[#0B0F19] text-white border-b border-neutral-800/80 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <FadeContent direction="up" distance={30} blur>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              Global Headquarters
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Where to Find Us
            </h2>
            <p className="text-lg text-neutral-300 max-w-xl mx-auto">
              Visit our innovation tower in Jakarta or connect with our engineering leadership team.
            </p>
          </div>
        </FadeContent>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Office details column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <FadeContent direction="left" distance={40} blur>
              <div className="p-8 rounded-2xl bg-[#111827]/90 border border-neutral-800 shadow-xl backdrop-blur-md space-y-6">
                {/* Header badge */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div>
                    <h3 className="text-xl font-bold text-white">{info.company}</h3>
                    <p className="text-xs text-primary-400 font-semibold">{info.tagline}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck size={14} /> {info.status}
                  </span>
                </div>

                {/* Info list */}
                <div className="space-y-5 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/15 text-primary-400 border border-primary-500/30 flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-semibold uppercase mb-0.5">Headquarters Address</p>
                      <p className="text-neutral-200 leading-relaxed font-medium">{info.address}</p>
                    </div>
                  </div>

                  {/* Phone and email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-semibold uppercase mb-0.5">Contact Line</p>
                      <p className="text-neutral-200 font-medium">{info.phone}</p>
                      <p className="text-neutral-400 text-xs mt-0.5">{info.email}</p>
                    </div>
                  </div>

                  {/* Operating hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-semibold uppercase mb-0.5">Business Hours</p>
                      <p className="text-neutral-200 font-medium">{info.hours?.mon_fri}</p>
                      <p className="text-xs text-primary-400 mt-0.5">{info.hours?.support}</p>
                    </div>
                  </div>
                </div>

                {/* Direct actions */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=-6.2253,106.8086"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-primary-600/30"
                  >
                    Get Directions <ExternalLink size={15} />
                  </a>
                  <Button to="/contact" variant="outline" size="md">
                    Schedule Visit
                  </Button>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* Google maps */}
          <div className="lg:col-span-7">
            <FadeContent direction="right" distance={40} delay={0.2} blur className="h-full">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-[#111827] shadow-2xl h-full min-h-[440px]">
                <iframe
                  title="VTech Location Map"
                  src={info.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '440px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  )
}
