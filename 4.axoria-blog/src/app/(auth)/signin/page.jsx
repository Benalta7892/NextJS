"use client";
import { useRef } from "react";

function page() {
  const serverInfoRef = useRef();
  const submitButtonRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Your pseudo
      </label>
      <input type="text" className="f-auth-input" id="userName" placeholder="Your pseudo" required />

      <label htmlFor="password" className="f-label">
        Your password
      </label>
      <input type="password" className="f-auth-input" id="password" placeholder="Your password" required />

      <button
        ref={submitButtonRef}
        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-6 mb-10 rounded border-none">
        Submit
      </button>

      <p ref={serverInfoRef} className="text-center mb-10"></p>
    </form>
  );
}
export default page;
