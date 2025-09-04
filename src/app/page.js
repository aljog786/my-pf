import Hero from "@/components/hero/hero";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Contact = dynamic(() => import("@/components/contact/contact"), {
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
}
