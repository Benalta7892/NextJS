"use server";

export async function getImg() {
  // Simule un appel API pour illustrer l’usage de fetch (sans traiter une réponse JSON)
  const res = await fetch("https://placehold.co/600x400");
  const imgObject = res.url;

  return imgObject;
}
