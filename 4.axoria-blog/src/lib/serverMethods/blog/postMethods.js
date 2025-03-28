import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";

export const getPost = async (slug) => {
  try {
    await connectToDB();

    const post = await Post.findOne({ slug });

    return post;
  } catch (err) {
    console.error("Error while fetch a post", err);
    throw new Error("Failed to fetch post");
  }
};

export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find({});

    return posts;
  } catch (err) {}
};
