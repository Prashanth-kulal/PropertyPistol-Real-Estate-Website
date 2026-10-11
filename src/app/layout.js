import "./globals.css";

export const metadata = {
  title: "AuraLiving — India's Premier Zero Brokerage Real Estate Experience",
  description: "Explore 30,000+ luxury apartments, new projects, and prime residential developments with zero brokerage advisory across Mumbai, Pune, Bangalore, Delhi NCR, and Dubai.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-['Poppins',sans-serif] bg-white text-[#252525]">
        {children}
      </body>
    </html>
  );
}
