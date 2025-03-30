import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Tag } from "@/lib/models/tag";

export const getPost = async (slug) => {
  try {
    await connectToDB();

    const post = await Post.findOne({ slug }).populate({
      path: "tags",
      select: "name slug",
    });
    console.log("post", post);

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
