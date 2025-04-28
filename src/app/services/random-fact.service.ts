import {inject, Injectable} from '@angular/core';
import {RandomFact} from './random-fact';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomFactService {

  private readonly http: HttpClient = inject(HttpClient);

  getRandomFact(): Observable<RandomFact> {
    return this.http.get<RandomFact>('https://uselessfacts.jsph.pl/api/v2/facts/random');
  }
}
