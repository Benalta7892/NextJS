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

export const getUserPostsFromUserId = async (userId) => {
  await connectToDB();

  const posts = await Post.find({ author: userId }).select("title _id slug");

  return posts;
};

export const getPostsByTag = async (tagSlug) => {
  await connectToDB();

  const tag = await Tag.findOne({ slug: tagSlug });
  if (!tag) {
    notFound();
  }

  const posts = await Post.find({ tags: tag._id })
    .populate({
      path: "author",
      select: "userName",
    })
    .select("title covertImageUrl slug createdAt")
    .sort({ createdAt: -1 });

  return posts;
};
