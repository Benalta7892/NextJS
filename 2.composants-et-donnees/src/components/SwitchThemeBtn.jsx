"use client";
import { useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";

function SwitchThemeBtn() {
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <button onClick={toggleTheme} className="fixed top-5 right-5 border border-violet-500 p-4">
      Mode : {theme}
    </button>
  );
}
export default SwitchThemeBtn;
