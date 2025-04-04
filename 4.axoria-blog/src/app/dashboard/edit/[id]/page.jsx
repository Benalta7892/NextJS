import { getPostForEdit } from "@/lib/serverMethods/blog/postMethods";
import ClientEditForm from "./(components)/ClientEditForm";
import { Types } from "mongoose";

const page = async ({ params }) => {
  const { id } = await params;
  console.log(id, "ID DE L'ARTICLE");

  const post = await getPostForEdit(id);

  const serializablePost = JSON.parse(
    JSON.stringify(post, (key, value) => (value instanceof Types.ObjectId ? value.toString() : value))
  );

  return <ClientEditForm post={serializablePost} />;
};

export default page;
