import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Tag } from "@/lib/models/tag";
import { notFound } from "next/navigation";

export const getPost = async (slug) => {
  await connectToDB();

  const post = await Post.findOne({ slug })
    .populate({
      path: "author",
      select: "userName normalizedUserName",
    })
    .populate({
      path: "tags",
      select: "name slug",
    });

  if (!post) return notFound();

  return post;
};

export const getPosts = async () => {
  await connectToDB();
  const posts = await Post.find({});

  return posts;
};
