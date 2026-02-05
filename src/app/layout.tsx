import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitty Adoption - Find Your Perfect Pet",
  description: "Platform for connecting adopters with shelters and rescuing cats in need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div id="root">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}