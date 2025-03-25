"use client";
import { useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";

function page() {
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <div>
      <h1 className="mb-4">Paramètres</h1>
      <button onClick={toggleTheme} className="top-5 right-5 border border-violet-500 p-4">
        Mode : {theme}
      </button>
    </div>
  );
}
export default page;
