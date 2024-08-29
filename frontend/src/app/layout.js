// layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import ItemState from "../Context/itemState";  // Import your context

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ItemState>
          {children}
        </ItemState>
      </body>
    </html>
  );
}
