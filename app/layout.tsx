import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const marathi = localFont({
  src: [
    { path: "../public/fonts/noto-devanagari-regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/noto-devanagari-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-marathi",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "नोकरी महाराष्ट्र | तुमच्या पुढच्या संधीचा शोध", template: "%s | नोकरी महाराष्ट्र" },
  description: "महाराष्ट्रातील सरकारी भरती मराठीत शोधण्यासाठी सोपा अनुभव. शिक्षण, जिल्हा व विभागानुसार शोधा, पात्रता आणि तारखा पाहा, आवडत्या नोकऱ्या जतन करा. सध्या नमुना प्रिव्ह्यू.",
  applicationName: "नोकरी महाराष्ट्र",
  robots: { index: false, follow: false },
  openGraph: { title: "नोकरी महाराष्ट्र", description: "योग्य माहिती. योग्य संधी. तुमच्या भाषेत.", locale: "mr_IN", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mr" className={marathi.variable}>
      <body><a className="skip-link" href="#main-content">मुख्य मजकुराकडे जा</a>{children}</body>
    </html>
  );
}
