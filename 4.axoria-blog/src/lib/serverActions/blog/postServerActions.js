"use server";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import slugify from "slugify";

export async function addPost(formData) {
  // On extrait les données du formulaire (destructuring grace aux names des inputs et textarea)
  const { title, markdownArticle, tags } = Object.fromEntries(formData);

  // try catch pour gérer les erreurs lors de la création du post
  try {
    // On attend la connexion à la base de données ou on utilise la connexion existante
    await connectToDB();

    // Gestion des tags
    const tagNamesArray = JSON.parse(tags);

    // On veut un tableau d'ObjectId pour les tags
    const tagIds = await Promise.all(
      // Chaque callback asynchrone renvoie une promesse car on utilise await
      tagNamesArray.map(async (tagName) => {
        const normalizedTagName = tagName.trim().toLowerCase();
        let tag = await Tag.findOne({ name: normalizedTagName });

        // Si le tag n'existe pas, on le crée
        if (!tag) {
          tag = await Tag.create({
            name: normalizedTagName,
            slug: slugify(normalizedTagName, { strict: true }),
          });
        }

        return tag._id; // Correspond a l'ObjectId du tag
      })
    );

    // On definit le modèle de données "Post" pour creer une instance de post
    const newPost = new Post({
      title,
      markdownArticle,
      tags: tagIds,
    });

    // On sauvegarde le post dans la base de données
    const savedPost = await newPost.save();
    console.log("Post saved");

    // On retourne un objet avec un message de succès et le slug du post
    return { success: true, slug: savedPost.slug };

    // On catch les erreurs et on les affiche dans la console
  } catch (err) {
    console.log("Error while creating the post :", err);
    throw new Error(err.message || "An error occured while creating the post");
  }
}
