import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductService from "@/components/ProductService";
import ReviewTestimonial from "@/components/ReviewTestimonial";
import Evenment from "@/components/Evenment";
import Service from "@/components/Service";
import Jointhecommunity from "@/components/Jointhecommunity";
import Footer from "@/components/Footer";
import { getToken } from "@/lib/utils";

function Home() {
  const user = getToken();
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <ProductService />
     {/*  <ReviewTestimonial /> */}
      <Evenment />
      {user == null ? (
        <div>
          <Service />
          <Jointhecommunity />
        </div>
      ) : (
        ""
      )}
      {/*   <Service />
        <Jointhecommunity /> */}
    </div>
  );
}

export default Home;
