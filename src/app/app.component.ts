import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RandomFactService} from './services/random-fact.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatButtonModule, MatIconModule, MatIconModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentRandomFact: Promise<string>;

  randomFactService = inject(RandomFactService);

  constructor() {
    this.currentRandomFact= this.randomFactService.getRandomFact().then(fact => fact.text);
  }

  fetchRandomFact() {
    this.currentRandomFact = this.randomFactService.getRandomFact().then(fact => fact.text)
  }
}
