"use client";
import { gql, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const GET_CHARACTER = gql`
  query getCharacter($id: ID!) {
    person(id: $id) {
      name
      height
      mass
      hairColor
      skinColor
      eyeColor
      birthYear
      gender
      species {
        name
      }
      homeworld {
        name
        population
        diameter
        gravity
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

const CharacterDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/characters/")[1]; // Use the router to access the ID from the URL

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !id, // Skip query if ID is not available yet
  });

  console.log("Character ID:", id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.person;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <div className="mb-4">
        <p>
          <strong>Birth Year:</strong> {character.birthYear}
        </p>
        <p>
          <strong>Height:</strong> {character.height}
        </p>
        <p>
          <strong>Mass:</strong> {character.mass}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Hair Color:</strong> {character.hairColor}
        </p>
        <p>
          <strong>Skin Color:</strong> {character.skinColor}
        </p>
        <p>
          <strong>Eye Color:</strong> {character.eyeColor}
        </p>
        {character.species && (
          <p>
            <strong>Species:</strong> {character.species.name}
          </p>
        )}
        <p>
          <strong>Homeworld:</strong>
          <ul className="ml-4">
            <li>Name: {character.homeworld.name}</li>
            <li>Population: {character.homeworld.population}</li>
            <li>Diameter: {character.homeworld.diameter}</li>
            <li>Gravity: {character.homeworld.gravity}</li>
          </ul>
        </p>
        <p>
          <strong>Films:</strong>{" "}
          {character.filmConnection.films
            .map((film: any) => film.title)
            .join(", ")}
        </p>
      </div>
      <Link href="/" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Back to Character List
      </Link>
    </div>
  );
};

export default CharacterDetails;
