"use client";
import { register } from "@/lib/serverActions/session/sessionServerActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function page() {
  const serverInfoRef = useRef();
  const submitButtonRef = useRef();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    serverInfoRef.current.classList.add("hidden");
    serverInfoRef.current.textContent = "";
    submitButtonRef.current.textContent = "Saving user...";
    submitButtonRef.current.disabled = true;

    try {
      const result = await register(new FormData(e.target));

      if (result.success) {
        submitButtonRef.current.textContent = "User created ✅";

        let countdown = 3;
        serverInfoRef.current.classList.remove("hidden");
        serverInfoRef.current.textContent = `Redirecting in ${countdown}...`;

        const interval = setInterval(() => {
          countdown -= 1;
          serverInfoRef.current.textContent = `Redirecting in ${countdown}...`;

          if (countdown === 0) {
            clearInterval(interval);
            router.push(`/signin`);
          }
        }, 1000);
      }
    } catch (error) {
      submitButtonRef.current.textContent = "Submit";
      serverInfoRef.current.classList.remove("hidden");
      serverInfoRef.current.textContent = `${error.message}`;
      submitButtonRef.current.disabled = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Name or pseudo
      </label>
      <input type="text" className="f-auth-input" id="userName" name="userName" placeholder="Name or pseudo" required />

      <label htmlFor="email" className="f-label">
        E-mail
      </label>
      <input type="email" className="f-auth-input" id="email" name="email" placeholder="E-mail" required />

      <label htmlFor="password" className="f-label">
        Password
      </label>
      <input
        type="password"
        className="f-auth-input"
        id="password"
        name="password"
        placeholder="Your password"
        required
      />

      <label htmlFor="passwordRepeat" className="f-label">
        Confirm password
      </label>
      <input
        type="password"
        className="f-auth-input"
        id="passwordRepeat"
        name="passwordRepeat"
        placeholder="Confirm password"
        required
      />

      <button
        ref={submitButtonRef}
        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 my-10 rounded border-none">
        Submit
      </button>

      <p ref={serverInfoRef} className="hidden text-center mb-10"></p>

      <a href="/signin" className="mb-5 underline text-blue-600 block text-center">
        Already have an account ? Log in
      </a>
    </form>
  );
}
export default page;
