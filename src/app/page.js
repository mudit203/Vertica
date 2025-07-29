import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import TopRated from "@/components/TopRated";
import PopularTVShows from "@/components/PopularTVShows";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Trending />
      <TopRated />
      <PopularTVShows />
      <Footer/>
    </div>
  );
}
