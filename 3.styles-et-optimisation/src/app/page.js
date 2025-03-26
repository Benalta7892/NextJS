import Card from "@/components/Card/Card";
import Image from "next/image";
import mountain from "../../public/images/mountain-1080.jpg";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-mono mb-6">Styles et optimisation</h1>
      <Card />
      <Image
        src={mountain}
        alt="Une montagne"
        sizes="
        (max-width: 500px) 500px,
        (max-width: 800px) 800px,
        (max-width: 1080px) 1080px,
        1080px
      "
      />
    </main>
  );
}
