import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Tag } from "@/lib/models/tag";
import { notFound } from "next/navigation";
import { User } from "@/lib/models/user";

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
    .select("title coverImageUrl slug createdAt")
    .sort({ createdAt: -1 });

  return posts;
};

export const getPostsByAuthor = async (normalizedUserName) => {
  await connectToDB();

  const author = await User.findOne({ normalizedUserName });
  if (!author) {
    notFound();
  }

  const posts = await Post.find({ author: author._id })
    .populate({
      path: "author",
      select: "userName normalizedUserName",
    })
    .select("title coverImageUrl slug createdAt")
    .sort({ createdAt: -1 });

  return { author, posts };
};

export const getPostForEdit = async (slug) => {
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
