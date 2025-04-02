import Link from "next/link";
import { getUserPostsFromUserId } from "@/lib/serverMethods/blog/postMethods";

const page = async ({ params }) => {
  const { userId } = await params;

  const posts = await getUserPostsFromUserId(userId);

  return (
    <main className="u-main-container u-padding-content-container">
      <h1 className="text-3xl mb-5">Dashboard - Your articles</h1>

      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} className="flex items-center mb-2 bg-slate-50 py-2 pl-4">
              <Link href={`/article/${post.slug}`} className="mr-auto underline underline-offset-2 text-violet-600">
                {post.title}
              </Link>
              <button>Delete</button>
              <Link
                href={`/dashboard/edit/${post.slug}`}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded mr-2">
                Edit
              </Link>
            </li>
          ))
        ) : (
          <li>You haven't created any articles yet.</li>
        )}
      </ul>
    </main>
  );
};

export default page;
