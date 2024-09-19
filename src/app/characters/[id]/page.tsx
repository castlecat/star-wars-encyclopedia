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
          id
          title
        }
      }
    }
  }
`;

const CharacterDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/characters/")[1];

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  });

  console.log("Character ID:", id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.person;

  return (
    <div className="container mx-auto p-4">
      {character.name && (
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8 ml-1 font-starjedi text-black sw-shadow">
          {character.name}
        </h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {character.birthYear && (
          <p>
            <strong>Birth Year:</strong> {character.birthYear}
          </p>
        )}
        {character.height && (
          <p>
            <strong>Height:</strong> {character.height}
          </p>
        )}
        {character.mass && (
          <p>
            <strong>Mass:</strong> {character.mass}
          </p>
        )}
        {character.gender && (
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
        )}
        {character.hairColor && (
          <p>
            <strong>Hair Color:</strong> {character.hairColor}
          </p>
        )}
        {character.skinColor && (
          <p>
            <strong>Skin Color:</strong> {character.skinColor}
          </p>
        )}
        {character.eyeColor && (
          <p>
            <strong>Eye Color:</strong> {character.eyeColor}
          </p>
        )}
        {character.species && (
          <p>
            <strong>Species:</strong> {character.species.name}
          </p>
        )}
      </div>
      <hr className="my-4 lg:my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="mb-4 lg:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {character.homeworld && (
          <p>
            <strong>Homeworld:</strong>
            <ul className="ml-4">
              {character.homeworld.name && (
                <li>Name: {character.homeworld.name}</li>
              )}
              {character.homeworld.population && (
                <li>Population: {character.homeworld.population}</li>
              )}
              {character.homeworld.diameter && (
                <li>Diameter: {character.homeworld.diameter}</li>
              )}
              {character.homeworld.gravity && (
                <li>Gravity: {character.homeworld.gravity}</li>
              )}
            </ul>
          </p>
        )}
        {character.filmConnection.films && (
          <p>
            <strong>Films:</strong>
            <ul className="ml-4">
              {character.filmConnection.films.map((film: any) => (
                <li key={film.id}>{film.title}</li>
              ))}
            </ul>
          </p>
        )}
      </div>
      <Link
        href="/"
        className="bg-background border border-swyellow text-swyellow p-2 rounded-lg hover:opacity-70 transition-all ease-in-out delay-30 duration-150"
      >
        Back to Character List
      </Link>
    </div>
  );
};

export default CharacterDetails;
