"use client";

function page() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="u-main-container bg-white p-7 mt-32 mb-44">
      <h1 className="text-4xl mb-4">Write an article 📝</h1>

      <form onSubmit={handleSubmit} className="pb-6">
        <label htmlFor="title" className="f-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="shadow border rounded w-full
            p-3 mb-7 text-gray-700"
          id="title"
          placeholder="Title"
          required
        />
      </form>
    </main>
  );
}
export default page;
