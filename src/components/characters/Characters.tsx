import React, { useState } from "react";
import Link from "next/link";
import s from "./Characters.module.scss";
import { Button } from "../button/Button";
import { ICharacter, IPeopleResponse } from "../../types";

type Props = {
  people: IPeopleResponse | null;
};

type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ people }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const [characters, setCharacters] = useState<Array<ICharacter>>(
    people?.allPeople?.people ?? []
  );

  const [nextPage, setNextPage] = useState<string | null>(
    people?.allPeople?.pageInfo?.endCursor ?? null
  );

  const [hasNextPage, setHasNextPage] = useState<boolean>(
    people?.allPeople?.pageInfo?.hasNextPage ?? false
  );

  const fetchMore = async (): Promise<void> => {
    setLoading(true);
    const url = `api/characters/?after=${nextPage}`;
    let moreCharacters: IPeopleResponse | undefined;
    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error("error");
      }
      moreCharacters = await result.json();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    setCharacters(characters.concat(moreCharacters?.allPeople?.people ?? []));
    setHasNextPage(moreCharacters?.allPeople?.pageInfo?.hasNextPage ?? false);
    setNextPage(moreCharacters?.allPeople?.pageInfo?.endCursor ?? "");
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
      {loading && <p className={s.news__loading}>Fetching more data...</p>}
      <Button disabled={loading} onClick={fetchMore}>
        Fetch more
      </Button>
    </section>
  );
}
