import {Injectable} from '@angular/core';
import {RandomFact} from './random-fact';

@Injectable({
  providedIn: 'root'
})
export class RandomFactService {

  private url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

  async getRandomFact(): Promise<RandomFact> {
    const data = await fetch(this.url);
    return (await data.json()) ?? {};
  }
}
