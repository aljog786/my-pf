import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_global.scss";
import { Montserrat } from "next/font/google";
import Providers from "@/components/providers/Providers";
import WaterBackground from "@/components/background/water-background";
import MainHeader from "@/components/main-header/main-header";
import Footer from "@/components/footer/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "Portfolio - Aljo",
  description: "A simple portfolio using Bootstrap & Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="light" className={montserrat.className} suppressHydrationWarning>
      <body className="d-flex flex-column min-vh-100">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="visually-hidden-focusable position-absolute start-0 top-0 p-2 bg-body-secondary rounded-2 ms-2 mt-2">
          Skip to content
        </a>
        <Providers>
          <WaterBackground />
          <div className="position-relative z-1 d-flex flex-column flex-grow-1">
            <MainHeader />
            <main id="main-content" className="flex-grow-1" role="main" aria-live="polite">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
