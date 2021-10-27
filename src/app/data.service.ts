import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
import { PlantData } from './plantdata.model';

@Injectable({providedIn: 'root'})
export class DataService implements OnInit{
  public plantData: any = [];

  // This pulls data from our ourPlantData api page
  private REST_API_SERVER = "http://localhost:3000/api/plantData";

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit() {
    this.getData();
  }

  //May cause a problem- this is meant to reconcile the types, but this creates errors
  //https://www.javatpoint.com/transforming-response-data-in-mean-stack
//   getAll(){
//     this.httpClient.get<{plantData: PlantData[]}>(this.REST_API_SERVER)
//     .pipe(map((sendData) => {
//           return sendData.plantData.map(plantData=>{
//             return{
//               id: plantData.id,    
//               LatinName: plantData.LatinName,
//               CommonName: plantData.CommonName,
//               Habit: plantData.Habit,
//               Height: plantData.Height,
//               Hardiness: plantData.Hardiness,
//               Growth: plantData.Growth,
//               Soil: plantData.Soil,
//               Shade: plantData.Shade,
//               Moisture: plantData.Moisture,
//               PH: plantData.PH,
//               FloweringStart: plantData.FloweringStart,
//               FloweringEnd: plantData.FloweringEnd,
//               Edible: plantData.Edible,
//               Medicinal: plantData.Medicinal,
//               Other: plantData.Other
//             };  
//           });  
//         }))
//       .subscribe((transformedPost)=>{  
//         this.plantData = transformedPost;  
// });  
// }

  // public getAllData(): PlantData[] {
  //   return this.httpClient.get<{plantData: PlantData[]}>(this.REST_API_SERVER);
  // }

  getData(){
    return this.httpClient.get<{plantData: PlantData[]}>(this.REST_API_SERVER).subscribe((res)=>{
      // this.plantData = res
      // console.log(this.plantData);
    })
  }
}