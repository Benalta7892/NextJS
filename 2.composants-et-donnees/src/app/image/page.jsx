async function page() {
  // Simule un appel API pour illustrer l’usage de fetch (sans traiter une réponse JSON)
  const res = await fetch("https://placehold.co/600x400");
  const imgObject = res.url;
  console.log(imgObject);

  return (
    <div>
      <h1>Une image</h1>
      <img src={imgObject} alt="Image de test" />
    </div>
  );
}
export default page;
