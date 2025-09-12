
import { RestaurantRiderNavbar } from "@/components/customer-panel-components/admin-rider-navbar";
import ComingSoon from "@/components/customer-panel-components/coming-soon";
import { FeaturedRestaurants } from "@/components/customer-panel-components/featured-restaurants";
import { Footer } from "@/components/customer-panel-components/footer";
import { Header } from "@/components/customer-panel-components/header";

import { HeroSection } from "@/components/customer-panel-components/hero-section";
import MobileSection from "@/components/customer-panel-components/mobile-section";
import { PopularCuisines } from "@/components/customer-panel-components/popular-cuisines";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <RestaurantRiderNavbar/>
      <Header />
      <main>
        <HeroSection />
        <FeaturedRestaurants />
        <PopularCuisines />
        <MobileSection/>
        <ComingSoon/>
      </main>
      <Footer />
    </div>
  )
}
