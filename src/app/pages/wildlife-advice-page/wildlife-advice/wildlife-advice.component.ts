import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { PlantData } from '../../../plantdata.model';  
import { MinimalTestData } from '../../../minimalTestData.model';  
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

// public plantData: PlantData[] = [];
public minimalTestData: MinimalTestData[] = [];

  // This pulls data from our ourPlantData api page
  // private REST_API_SERVER = "http://localhost:3000/api/plantData";
  private REST_API_SERVER = "http://localhost:3000/api/minimalTestData";

  constructor(private httpClient: HttpClient) { 
  }

  // When this class is instantiated, the data is retrieved
  ngOnInit() {
  this.httpClient.get<any>(this.REST_API_SERVER).subscribe((response)=>{
    // this.plantData = response;
    this.minimalTestData = response;
  });
}
}