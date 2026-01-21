import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import FeaturedDeals from "@/components/FeaturedDeals";
import TrustBadges from "@/components/TrustBadges";
import LatestReviews from "@/components/LatestReviews";
import LatestArticles from "@/components/LatestArticles";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedDeals />
      <LatestReviews />
      <TrustBadges />
      <LatestArticles />
    </>
  );
}
