import { Injectable, OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataService implements OnInit{
  public plantData: any = [];

  constructor() {
  }

  ngOnInit() {
  }

}