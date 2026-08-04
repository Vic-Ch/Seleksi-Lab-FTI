import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClickSpark from '../components/reactbits/ClickSpark'

export default function Layout() {
  return (
    <ClickSpark sparkColor="#2563EB" sparkCount={10} sparkRadius={22} duration={450}>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ClickSpark>
  )
}
