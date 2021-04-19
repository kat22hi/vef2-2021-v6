import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <div className={s.person__box}>
        <h4 className={s.person__h4}>Birth year:</h4>
        <p>{person.birthYear}</p>
        <h4 className={s.person__h4}>Eye color:</h4>
        <p>{person.eyeColor}</p>
        <h4 className={s.person__h4}>Hair color:</h4>
        <p>{person.hairColor}</p>
        <h4 className={s.person__h4}>Heigt:</h4>
        <p>{person.height} cm</p>
        <h4 className={s.person__h4}>Mass:</h4>
        <p>{person.mass} kg</p>

        
      </div>
      <Link href="/characters">Back to characters</Link>
    </div>
  );
}
