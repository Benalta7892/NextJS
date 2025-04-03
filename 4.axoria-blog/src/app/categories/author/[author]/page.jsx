import { getPostsByAuthor } from "@/lib/serverMethods/blog/postMethods";
import BlogCard from "@/components/BlogCard";

const page = async ({ params }) => {
  const { author } = await params;
  const postsData = await getPostsByAuthor(author);

  return (
    <main className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Posts from the {postsData.author.userName}</h1>
      <p className="t-main-subtitle">Every post from that author.</p>
      <p className="mr-4 text-md text-zinc-900">Latest articles</p>

      <ul className="u-articles-grid">
        {postsData.length > 0 ? (
          postsData.map((post) => <BlogCard key={post._id} post={post} />)
        ) : (
          <li>There is no article written by that author. 🤖</li>
        )}
      </ul>
    </main>
  );
};
export default page;
