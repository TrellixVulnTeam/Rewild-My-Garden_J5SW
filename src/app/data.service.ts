import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { PlantData } from './plantdata.model';

@Injectable({providedIn: 'root'})
export class DataService implements OnInit{
  public plantData: any = [];

  constructor() {
  }

  ngOnInit() {
  }

}