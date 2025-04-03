import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Tag } from "@/lib/models/tag";

// Recuperer les tags avec le nombre de posts associes
export const getTags = async () => {
  //  Connexion a la base de donnees
  await connectToDB();

  const tags = await Tag.aggregate([
    // On fait d'abord la jointure entre collection Tag et Post
    {
      $lookup: {
        from: "posts",
        foreignField: "tags",
        localField: "_id",
        as: "postsWithTag", // Tableau contenant les posts qui utilisent le tag en question
      },
    },
    // On compte le nombre de posts associes
    {
      $addFields: {
        postCount: { $size: "$postsWithTag" },
      },
    },
    // On filtre pour ne garder que les tags associes a au moins 1 post
    {
      $match: { postCount: { $gt: 0 } },
    },
    // Trie les tags par nombre de posts associes (du plus au moins)
    {
      $sort: { postCount: -1 },
    },
    // On supprime postsWithTag, on en a pas besoin
    {
      $project: { postsWithTag: 0 },
    },
  ]);

  return tags;
};
