"use client";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import SortOptions from "../components/SortOptions";
import CharacterCard from "../components/CharacterCard";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (data) {
      setFilteredCharacters(data.allPeople.people);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const results = data.allPeople.people.filter((character: any) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(results);
    }
  }, [searchTerm, data]);

  const sortedCharacters = filteredCharacters.sort((a: any, b: any) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <SearchBar onSearch={setSearchTerm} />
      <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCharacters.map((character: any) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
