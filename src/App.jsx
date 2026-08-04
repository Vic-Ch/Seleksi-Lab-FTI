import { Routes, Route } from 'react-router'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
