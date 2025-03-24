async function page() {
  const res = await fetch("https://placehold.co/600x400");

  const imgObject = res;
  console.log(imgObject);

  return (
    <div>
      <h1>Une image</h1>
      <img src={imgObject.url} alt="" />
    </div>
  );
}
export default page;
