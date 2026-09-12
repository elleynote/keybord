import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeSeoContent } from "@/components/HomeSeoContent";
import { KeyboardApp } from "@/components/KeyboardApp";

export default function HomePage() {
  return (
    <>
      <Header />
      <KeyboardApp />
      <HomeSeoContent />
      <Footer />
    </>
  );
}
