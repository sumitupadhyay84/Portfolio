import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Saira_Stencil_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const sairaStencil = Saira_Stencil_One({
  variable: "--font-stencil",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sumit Upadhyay | Full Stack Developer",
    template: "%s | Sumit Upadhyay",
  },
  description:
    "Portfolio of Sumit Upadhyay - Full Stack Developer building scalable web applications with React, Next.js, Node.js, and modern cloud technologies.",
  keywords: [
    "Sumit Upadhyay",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Sumit Upadhyay" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Sumit Upadhyay | Full Stack Developer",
    description:
      "Portfolio of Sumit Upadhyay - Full Stack Developer building modern scalable products.",
    type: "website",
    images: ["/images/developer-avatar.png"],
  },
  metadataBase: new URL("https://example.com"),
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(plusJakarta.variable, outfit.variable, sairaStencil.variable, "h-full")}>
      <body className="min-h-full bg-zinc-950 font-body text-zinc-200 antialiased">{children}</body>
    </html>
  );
}
