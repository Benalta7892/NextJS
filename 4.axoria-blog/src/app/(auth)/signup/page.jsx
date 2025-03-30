function page() {
  return (
    <form className="max-w-md mx-auto mt-36">
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

      <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 my-10 rounded border-none">
        Submit
      </button>

      <a href="/signin" className="mb-5 underline text-blue-600 block text-center">
        Already have an account ? Log in
      </a>
    </form>
  );
}
export default page;
