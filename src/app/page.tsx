import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Block3DSection } from "@/components/block3d/Block3DSection";
import { Products } from "@/components/sections/Products";
import { WhyUs } from "@/components/sections/WhyUs";
import { Calculator } from "@/components/sections/Calculator";
import { ExpertsCta } from "@/components/sections/ExpertsCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Block3DSection />
      <Products />
      <WhyUs />
      <Calculator />
      <ExpertsCta />
    </>
  );
}
