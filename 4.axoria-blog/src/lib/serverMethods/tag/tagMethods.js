import { Tag } from "@/lib/models/tag";
import slugify from "slugify";

const findOrCreateTag = async (tagName) => {
  const tagSlug = slugify(tagName, { lower: true, strict: true });
  let tag = await Tag.findOne({ slug: tagSlug });

  if (!tag) {
    tag = await Tag.create({ name: tagName, slug: tagSlug });
  }

  return tag._id;
};

export default findOrCreateTag;
