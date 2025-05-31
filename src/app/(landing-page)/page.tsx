import Hero from "@/components/layout/global/hero";
import BrandLogo from "@/components/layout/global/brandLogo";
import { FeaturesSectionDemo } from "@/components/layout/global/features";
import Pricing from "@/components/layout/global/pricing";
import FAQ from "@/components/layout/global/faq";
import CTA from "@/components/layout/global/cta";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Top section with background */}
      <div className="relative min-h-[100dvh]">
        <Image
          src={"/bg.jpg"}
          alt="Background image"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={90}
          className="z-0 opacity-70"
        />

        <div className="absolute inset-0 z-10 bg-black opacity-40 dark:bg-gray-950 dark:opacity-60"></div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20"></div>

        <div className="relative z-40 flex flex-col min-h-[100dvh]">
          <div className="flex flex-col flex-grow items-center justify-center px-4 pt-16 sm:pt-20 md:pt-24 lg:pt-32">
            <div className="w-full max-w-7xl mx-auto">
              <Hero />
            </div>
          </div>
          <div className="relative z-20 w-full mt-8 sm:mt-12 md:mt-16 lg:mt-24">
            <BrandLogo />
          </div>
        </div>
      </div>

      {/* Content sections with proper spacing and container */}
      <div className="relative z-20 bg-background">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <FeaturesSectionDemo />
          </div>

          <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <Pricing />
          </div>

          <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <FAQ />
          </div>

          <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <CTA />
          </div>
        </div>
      </div>
    </>
  );
}
