import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import ProductDeepDive from '@/components/sections/ProductDeepDive'
import TestimonialWall from '@/components/sections/TestimonialWall'
import FAQ3D from '@/components/sections/FAQ3D'
import FinalCTA from '@/components/sections/FinalCTA'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <SocialProof />
        <ProductDeepDive />
        <TestimonialWall />
        <FAQ3D />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
