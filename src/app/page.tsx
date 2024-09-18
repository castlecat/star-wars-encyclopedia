import CharacterList from "../components/CharacterList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Star Wars Character Encyclopedia
      </h1>
      <CharacterList />
    </div>
  );
}
