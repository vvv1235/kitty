import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/provider";

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
      <body className="bg-white">
        <AuthProvider>
          <div id="root">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}