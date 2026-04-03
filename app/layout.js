import "./globals.css";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "Iyarkai Roast Coffee - Life begins after coffee",
  description: "Small-batch specialty coffee roasted to order."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
