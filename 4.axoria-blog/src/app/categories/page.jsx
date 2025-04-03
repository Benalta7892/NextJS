import { getTags } from "@/lib/serverMethods/blog/tagMethods";

const page = async () => {
  const tags = await getTags();
  console.log(tags, "tagsConsole");

  return <div>page</div>;
};
export default page;
