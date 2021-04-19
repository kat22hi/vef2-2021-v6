import Link from 'next/link';
import { ICharacter } from '../../types';

import s from './Film.module.scss';

type Props = {
  title: string;
  openingCrawl: string;
  episodeID: number;
  characters: Array<ICharacter>;
};

export function Film({ title, openingCrawl, episodeID, characters }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        {title}
      </h2>
      <section className={s.film__content}>
        <div className={s.film__openingCrawl}>
          <p>{openingCrawl}</p>
        </div>
        <section>
          <h3>Characters</h3>
          <div className={s.film__characters}>
            {characters.map((character, i) => (
              <Link key={i} href={`/characters/${character.id}`}>{character.name}</Link>
            ))}
          </div>
        </section>
      </section>
      <div className={s.film__underline}>
        <hr />
      </div>
    </section>
  );
}
