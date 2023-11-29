import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private dataSubject = new BehaviorSubject<number>(0);
  data$ = this.dataSubject.asObservable();

  setNoOfItems( numberOfItems: number) {
    this.dataSubject.next(numberOfItems);
  }

}
