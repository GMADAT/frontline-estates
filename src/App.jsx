import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuickActions from './components/QuickActions'
import FirstResponder from './components/FirstResponder'
import FeaturedListings from './components/FeaturedListings'
import RecentlySold from './components/RecentlySold'
import OpenHouses from './components/OpenHouses'
import SellerValuation from './components/SellerValuation'
import Services from './components/Services'
import Areas from './components/Areas'
import MapSearch from './components/MapSearch'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PropertyFlyer from './components/PropertyFlyer'

function Divider() {
  return <div className="section-divider" aria-hidden="true" />
}

function MainSite() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Divider />
      <QuickActions />
      <Divider />
      <FirstResponder />
      <Divider />
      <FeaturedListings />
      <Divider />
      <RecentlySold />
      <Divider />
      <OpenHouses />
      <Divider />
      <SellerValuation />
      <Divider />
      <Services />
      <Divider />
      <Areas />
      <Divider />
      <MapSearch />
      <Divider />
      <About />
      <Contact />
      <Footer />

      {/* Floating flyer button */}
      <Link
        to="/harbor-house"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 font-bold text-sm tracking-wide rounded-full px-6 py-3.5 shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
          color: '#060e1e',
          boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
        }}
      >
        View Flyer →
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/harbor-house" element={<PropertyFlyer />} />
    </Routes>
  )
}
