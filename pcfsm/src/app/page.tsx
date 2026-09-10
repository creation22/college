import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import SafetyWorld from "@/components/SafetyWorld";
import Programs from "@/components/Programs";
import LearnByDoing from "@/components/LearnByDoing";
import Facilities from "@/components/Facilities";
import Centers from "@/components/Centers";
import Careers from "@/components/Careers";
import Stories from "@/components/Stories";
import WhyPcfsm from "@/components/WhyPcfsm";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <SafetyWorld />
        <Programs />
        <LearnByDoing />
        <Facilities />
        <Centers />
        <Careers />
        <Stories />
        <WhyPcfsm />
        <AdmissionsCTA />
      </main>
      <Footer />
    </>
  );
}
