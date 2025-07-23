import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_global.scss";
import MainHeader from "@/components/main-header/main-header.js";
import WaterBackground from "@/components/background/water-background.jsx";
import Footer from "@/components/footer/footer.jsx";
import Providers from "@/components/providers/Providers"; // NEW
import { Montserrat } from "next/font/google";

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
    <html lang="en" data-bs-theme="light" className={montserrat.className}>
      <body className="d-flex flex-column min-vh-100">
        <Providers>
          <WaterBackground />
          <div className="position-relative z-1 d-flex flex-column flex-grow-1">
            <MainHeader />
            <main className="flex-grow-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
