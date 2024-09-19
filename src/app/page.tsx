import CharacterList from "../components/CharacterList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8 ml-3 lg:ml-4 text-black font-starjedi sw-shadow">
        Star Wars Character Encyclopedia
      </h1>
      <CharacterList />
    </div>
  );
}
