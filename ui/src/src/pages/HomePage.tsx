import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import CourtCarousel from '../components/CourtCarousel'
import ClubSection from '../components/ClubSection'
import MatchSection from '../components/MatchSection'
import ComingSoon from '../components/ComingSoon'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <SearchBar />
      <CourtCarousel />
      <ClubSection />
      <MatchSection />
      <ComingSoon />
    </div>
  )
}
