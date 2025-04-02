import mongoose from "mongoose";
import slugify from "slugify";

// On crée un schéma pour les posts avec Mongoose (équivalent d'une table SQL)
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    markdownArticle: {
      type: String,
      required: true,
    },
    markdownHTMLResult: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  // On rajoute la date de création et de modification du post
  { timestamps: true }
);

// On creer un middleware pour le slug
postSchema.pre("save", async function (next) {
  // On verifie si le slug existe deja dans la base de données
  if (!this.slug) {
    // Si le slug n'existe pas, on le crée grace à slugify avec le titre du post
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slugCandidate = baseSlug;

    // Verification de l'unicité du slug
    let slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate });

    // Si le slug existe deja, on rajoute un nombre à la fin du slug jusqu'à ce qu'il soit unique
    let counter = 1;
    while (slugExist) {
      slugCandidate = `${baseSlug}-${counter}`;
      slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate });
      counter++;
    }

    // On rajoute le slug au post
    this.slug = slugCandidate;
    console.log("Final slug", slugCandidate);
  }
  // Pour finir, on appelle next() pour passer au middleware suivant ou à la sauvegarde
  next();
});

// On peut maintenant creer notre modèle Post, soit il existe et on l'utilise, soit on le crée
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
