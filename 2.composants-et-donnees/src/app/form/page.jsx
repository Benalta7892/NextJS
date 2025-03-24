"use client";
import { useState } from "react";

function page() {
  const [inputValue, setInputValue] = useState("");
  console.log(new Date().getTime());

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-2 mb-4 border border-gray-600"
        type="text"
      />
      <p>Tu as écris : {inputValue}</p>
    </div>
  );
}
export default page;
