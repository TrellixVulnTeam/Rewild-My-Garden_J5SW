import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
// import { PlantData } from './plantdata.model';

@Injectable({providedIn: 'root'})
export class DataService implements OnInit{
  public plantData: any = [];

  // This pulls data from our ourPlantData api page
  private REST_API_SERVER = "http://localhost:3000/api/plantData";

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit() {
  }

}