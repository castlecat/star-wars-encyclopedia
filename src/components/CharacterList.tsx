"use client";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_CHARACTERS = gql`
  query {
    allPeople {
      people {
        id
        name
        height
        mass
        gender
      }
    }
  }
`;

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.allPeople.people.map((character: any) => (
        <div key={character.id} className="p-4 border rounded shadow-md">
          <h2 className="text-xl font-bold">
            <Link href={`/characters/${character.id}`}>{character.name}</Link>
          </h2>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Gender: {character.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
