import { getPostsByTag } from "@/lib/serverMethods/blog/postMethods";

const page = async ({ params }) => {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  console.log(posts, "posts from tag");

  return <div>page</div>;
};
export default page;
