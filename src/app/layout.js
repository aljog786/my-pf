import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_global.scss";
import MainHeader from "@/components/main-header/main-header.js";
import WaterBackground from "@/components/background/water-background.jsx";
import { Montserrat } from "next/font/google";
import Footer from "@/components/footer/footer.jsx";
import { ThemeProvider } from "@/context/ThemeContext";

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
        <ThemeProvider>
          <WaterBackground />
          <div className="position-relative z-1">
            <MainHeader />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
