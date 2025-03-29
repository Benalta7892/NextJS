"use client";
import { addPost } from "@/lib/serverActions/blog/postServerActions";
import { useState, useRef } from "react";

function page() {
  const [tags, setTags] = useState(["css", "javascript"]);
  const tagInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await addPost(formData);
  };

  const handleAddTag = () => {
    const newTag = tagInputRef.current.value.trim().toLowerCase();

    if (newTag !== "" && !tags.includes(newTag) && tags.length <= 4) {
      setTags([...tags, newTag]);
      tagInputRef.current.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleEnterOnTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
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
            p-3 mb-7 text-gray-700 focus:outline-slate-400"
          id="title"
          placeholder="Title"
          required
        />

        <div className="mb-10">
          <label className="f-label" htmlFor="tag">
            Add a tag(s) (optional, max 5)
          </label>
          <div className="flex">
            <input
              type="text"
              className="shadow border rounded p-3 text-gray-700 focus:outline-slate-400"
              id="tag"
              placeholder="Add a tag"
              ref={tagInputRef}
              onKeyDown={handleEnterOnTagInput}
            />
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-4 rounded mx-4"
              onClick={handleAddTag}
              type="button"
            >
              Add
            </button>
            <div className="flex items-center grow whitespace-nowrap overflow-y-auto shadow border rounded px-3">
              {tags.map((tag, id) => (
                <span
                  key={id}
                  className="inline-block whitespace-normal bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 ml-2"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <label htmlFor="markdownArticle" className="f-label">
          Write your article using markdown - do not repeat the already given
          title
        </label>
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          className="block mb-4 text-blue-600"
        >
          How to use the markdown syntax ?
        </a>

        <textarea
          name="markdownArticle"
          id="markdownArticle"
          className="min-h-44 text-xl shadow appearance-none border rounded
            w-full p-8 to-gray-700 mb-4 focus:outline-slate-400"
          required
        ></textarea>

        <button
          className="min-w-44 bg-indigo-500 hover:bg-indigo-700
          text-white font-bold py-3 px-4 rounded border-none mb-4"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
export default page;
