import {
  ICharacter,
  ICharacterWithDetails,
  IPlanet,
  ISpecie,
  ISwapiResponse,
} from '../types';

const fetchPersonDetails = async (
  person: ICharacter,
): Promise<ICharacterWithDetails> => {
  let speciesData;
  let planetData;

  if (person.species.length > 0) {
    try {
      const speciesResponse = await fetch(person.species[0]);
      speciesData = await speciesResponse.json();
    } catch (e) {
      console.log(e);
    }
  }

  if (person.homeworld.length > 0) {
    try {
      const planetResponse = await fetch(person.homeworld);
      planetData = await planetResponse.json();
    } catch (e) {
      console.log(e);
    }
  }

  return {
    ...person,
    species: speciesData as ISpecie,
    homeworld: planetData as IPlanet,
  };
};

export const fetchAllPersonsWithDetails = async (page: number) => {
  const people: ISwapiResponse<ICharacter> = await (
    await fetch(`https://swapi.dev/api/people?page=${page}`)
  ).json();

  const detailedPeople = await Promise.all(
    people.results.map(fetchPersonDetails),
  );

  return {
    count: people.count,
    next: people.next,
    previous: people.previous,
    results: detailedPeople,
  };
};

export const fetchSearchAllPersonsWithDetails = async (
  query: string,
  page: number,
) => {
  const people: ISwapiResponse<ICharacter> = await (
    await fetch(`https://swapi.dev/api/people?search=${query}&page=${page}`)
  ).json();

  const detailedPeople = await Promise.all(
    people.results.map(fetchPersonDetails),
  );

  return {
    count: people.count,
    next: people.next,
    previous: people.previous,
    results: detailedPeople,
  };
};
