"use server";

export async function getImg() {
  // Simule un appel API pour illustrer l’usage de fetch (sans traiter une réponse JSON)
  const res = await fetch("https://placehold.co/600x400");
  const imgObject = res.url;

  return imgObject;
}

export async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts;
}

export async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return post;
}
