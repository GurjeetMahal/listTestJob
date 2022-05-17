import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages$ = this.data._message$;
  messageCount$ = this.data._message$.pipe(map((messages) => messages.length));
  constructor(private data: DataService) {}

  ngOnInit(): void {
  }


  onSearchChange(value: string) {
    this.data.searchMessage(value)
  }
}
