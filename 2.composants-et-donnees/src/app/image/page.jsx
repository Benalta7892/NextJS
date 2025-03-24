import { getImg } from "@/lib/serverActions";

async function Image() {
  const img = await getImg();

  return (
    <div>
      <h1>Une image</h1>
      <img src={img} alt="Image de test" />
    </div>
  );
}
export default Image;
