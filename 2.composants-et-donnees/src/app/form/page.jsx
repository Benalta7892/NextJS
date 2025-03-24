"use client";
import { useState } from "react";
import { getPost } from "@/lib/serverActions";

function page() {
  const [inputValue, setInputValue] = useState("");
  // console.log(new Date().getTime());

  async function handleGetArticle() {
    const post = await getPost(1);
    console.log(post);
  }

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-2 mb-4 border border-gray-600"
        type="text"
      />
      <p>Tu as écrit : {inputValue}</p>

      <button className="p-4 bg-green-500" onClick={handleGetArticle}>
        Récupérer un article
      </button>
    </div>
  );
}
export default page;
