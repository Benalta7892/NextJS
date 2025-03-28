import { connect } from "mongoose";
import Link from "next/link";
import { connectToDB } from "@/lib/utils/db/connectToDB";

const posts = [
  {
    author: "John Doe",
    title: "5 CSS tricks",
  },
  {
    author: "Victor Wallas",
    title: "How to code a navbar",
  },
  {
    author: "Bruce Willis",
    title: "How to setup TypeScript",
  },
];

export default async function Home() {
  await connectToDB();

  return (
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Stay up to date with AXORIA.</h1>
      <p className="t-main-subtitle">Tech news and useful knowledge</p>

      <p className="mr-4 text-md to-zinc-900">Latest articles</p>
      <ul className="u-articles-grid">
        {posts.map((post, id) => (
          <li
            key={id}
            className="rounded-sm shadow-md hover:shadow-xl border hover:border-zinc-300"
          >
            <div className="pt-5 px-5 pb-7">
              <div className="flex items-baseline gap-x-4 text-xs">
                <time
                  dateTime={new Date().toISOString()}
                  className="text-gray-500 text-sm"
                >
                  {new Date().toLocaleDateString("en-EN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <Link
                  href={`/categories/author/${post.autho}`}
                  className="ml-auto text-base text-gray-700
                  hover:text-gray-600 whitespace-nowrap truncate"
                >
                  {post.author}
                </Link>
              </div>
              <Link
                href={`/articles/${post.title}`}
                className="inline-block mt-6
              text-xl font-semibold text-zinc-800 hover:text-zinc-600
              "
              >
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
