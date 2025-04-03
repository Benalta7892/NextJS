"use client";
import { addPost } from "@/lib/serverActions/blog/postServerActions";
import areTagsSimilar from "@/lib/utils/general/utils";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const ClientEditForm = ({ post }) => {
  const [tags, setTags] = useState(post.tags.map((tag) => tag.name));

  const router = useRouter();

  const tagInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const serverValidationText = useRef(null);
  const imageUploadValidationText = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Les donnees de notre formulaire
    const formData = new FormData(e.target);

    // On veux lire ce qu'il y a dans formData et verifier si il y a des changements
    const readableFormData = Object.fromEntries(formData); // Lire la valeur de tous les inputs
    const areSameTags = areTagsSimilar(tags, post.tags);
    console.log(readableFormData);

    if (
      readableFormData.coverImage.size === 0 &&
      readableFormData.title.trim() === post.title &&
      readableFormData.markdownArticle.trim() === post.markdownArticle &&
      areSameTags
    ) {
      console.log("Dans la condition");
      serverValidationText.current.textContent = "You must make a change before submitting";
      return;
    } else {
      serverValidationText.current.textContent = "";
    }

    // On met tags dans le formData
    // On utilise JSON.stringify pour convertir le tableau en chaîne de caractères
    formData.set("tags", JSON.stringify(tags));
    formData.set("tags", post.slug);

    serverValidationText.current.textContent = "";
    submitButtonRef.current.textContent = "Updating Post...";
    submitButtonRef.current.disabled = true;

    try {
      const result = await addPost(formData);

      if (result.success) {
        submitButtonRef.current.textContent = "Post updated ✅";

        let countdown = 3;
        serverValidationText.current.textContent = `Redirecting in ${countdown}...`;
        const interval = setInterval(() => {
          countdown -= 1;
          serverValidationText.current.textContent = `Redirecting in ${countdown}...`;

          if (countdown === 0) {
            clearInterval(interval);
            router.push(`/article/${result.slug}`);
          }
        }, 1000);
      }
    } catch (error) {
      submitButtonRef.current.textContent = "Submit";
      serverValidationText.current.textContent = `${error.message}`;
      submitButtonRef.current.disabled = false;
    }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!validImageTypes.includes(file.type)) {
      imageUploadValidationText.current.textContent = "Please upload a valid image (JPEG, PNG or WebP)";
      e.target.value = "";
      return;
    } else {
      imageUploadValidationText.current.textContent = "";
    }

    const img = new Image();
    img.addEventListener("load", checkImgSizeOnlOAD);

    function checkImgSizeOnlOAD() {
      if (img.width > 1280 || img.height > 720) {
        imageUploadValidationText.current.textContent = "Image exceeds 1280x720 dimensions.";
        e.target.value = "";
        URL.revokeObjectURL(img.scr);
        return;
      } else {
        imageUploadValidationText.current.textContent = "";
        URL.revokeObjectURL(img.scr);
      }
    }

    img.src = URL.createObjectURL(file);
  };

  return (
    <main className="u-main-container bg-white p-7 mt-32 mb-44">
      <h1 className="text-4xl mb-4">Edit that article ✍🏼</h1>

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
          defaultValue={post.title}
          required
        />

        <label htmlFor="coverImage" className="f-label">
          <span>Cover image (1280x720 for best quality, or less)</span>
          <span className="block font-normal">
            Changing the image is <span className="font-bold">optional</span> in edit mode
          </span>
        </label>
        <input
          type="file"
          name="coverImage"
          className="shadow cursor-pointer border rounded w-full p-3 text-gray-700 mb-2 focus:outline-none focus:shadow-outline"
          id="coverImage"
          placeholder="Article's cover image"
          onChange={handleFileChange}
        />
        <p ref={imageUploadValidationText} className="text-red-700 mb-7"></p>

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
              type="button">
              Add
            </button>
            <div className="flex items-center grow whitespace-nowrap overflow-y-auto shadow border rounded px-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block whitespace-nowrap bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 ml-2">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <label htmlFor="markdownArticle" className="f-label">
          Write your article using markdown - do not repeat the already given title
        </label>
        <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="block mb-4 text-blue-600">
          How to use the markdown syntax ?
        </a>

        <textarea
          name="markdownArticle"
          id="markdownArticle"
          className="min-h-44 text-xl shadow appearance-none border rounded
            w-full p-8 to-gray-700 mb-4 focus:outline-slate-400"
          defaultValue={post.markdownArticle}
          required></textarea>

        <button
          ref={submitButtonRef}
          className="min-w-44 bg-indigo-500 hover:bg-indigo-700
          text-white font-bold py-3 px-4 rounded border-none mb-4">
          Submit
        </button>
        <p ref={serverValidationText}></p>
      </form>
    </main>
  );
};
export default ClientEditForm;
//
