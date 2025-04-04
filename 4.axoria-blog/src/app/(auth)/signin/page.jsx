"use client";
import { useRef } from "react";
import { login } from "@/lib/serverActions/session/sessionServerActions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";

function page() {
  const { setIsAuthenticated } = useAuth();

  const serverInfoRef = useRef();
  const submitButtonRef = useRef();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    serverInfoRef.current.classList.add("hidden");
    serverInfoRef.current.textContent = "";
    submitButtonRef.current.disabled = true;

    try {
      const result = await login(new FormData(e.target));

      if (result.success) {
        // serverInfoRef.current.classList.remove("hidden");
        setIsAuthenticated({
          loading: false,
          isConnected: true,
          userId: result.userId,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login :", error);
      serverInfoRef.current.classList.remove("hidden");
      submitButtonRef.current.disabled = false;
      serverInfoRef.current.textContent = error.message;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Your pseudo
      </label>
      <input type="text" className="f-auth-input" id="userName" name="userName" placeholder="Your pseudo" required />

      <label htmlFor="password" className="f-label">
        Your password
      </label>
      <input
        type="password"
        className="f-auth-input"
        id="password"
        name="password"
        placeholder="Your password"
        required
      />

      <button
        ref={submitButtonRef}
        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-6 mb-10 rounded border-none">
        Submit
      </button>

      <p ref={serverInfoRef} className="hidden text-center mb-10"></p>
    </form>
  );
}
export default page;
