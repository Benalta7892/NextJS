import "./globals.css";
import SwitchThemeBtn from "@/components/SwitchThemeBtn";
import { DarkModeProvider } from "@/context/DarkModeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-20">
        <DarkModeProvider>
          <SwitchThemeBtn />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
