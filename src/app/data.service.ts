import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
import { PlantData } from './plantdata.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private plantData: PlantData[] = [];

// const singlePlantData : PlantData = { 
// id: null,
// Name: 'Latin Name',
// CommonName: 'Common Name',
// Habit: 'Habit',
// Height: 'Height',
// Hardiness: 'Hardiness',
// Growth: 'Growth',
// Soil: 'Soil',
// Shade: 'Shade',
// Moisture: 'Moisture',
// PH: 'PH',
// FloweringStart: 'Flowering Start',
// FloweringEnd: 'Flowering End',
// Edible: 'Edible',
// Medicinal: 'Medicinal',
// Other: 'Other',
// }

  // This pulls data from our ourPlantData api page
  private REST_API_SERVER = "http://localhost:3000/api/ourPlantData";

  constructor(private httpClient: HttpClient) { }

  // THIS IS WRONG- JUST FOR A TEST - DATA SHOULD NOT BE RETURNED LIKE THIS
  public getAll(): PlantData[]{
    this.httpClient.get<{plantData: PlantData[]}>(this.REST_API_SERVER).
      subscribe(
        data => {
            this.plantData = data.plantData;
        },
        error => {
          console.log(error);
        });
        return this.plantData;

  }

  // public getAllData(): PlantData[] {
  //   return this.httpClient.get<{plantData: PlantData[]}>(this.REST_API_SERVER);
  // }
}