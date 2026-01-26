import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import FeaturedDeals from "@/components/FeaturedDeals";
import LatestReviews from "@/components/LatestReviews";
import LatestArticles from "@/components/LatestArticles";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedDeals />
      <LatestReviews />
      <LatestArticles />
      <HomeContent />
    </>
  );
}
