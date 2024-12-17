import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import LatestEscorts from "@/components/LatestEscorts";
import TypeOfEscorts from "@/components/TypeOfEscorts";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <TypeOfEscorts />
      <LatestEscorts />
    </>
  );
}
