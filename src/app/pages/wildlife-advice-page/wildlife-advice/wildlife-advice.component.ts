import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { PlantData } from '../../../plantdata.model';  
import { MinimalTestData } from '../../../minimalTestData.model';  
import { NoSpaceMinimalTestData } from '../../../noSpaceMinimalTestData.model'; 
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {
public noSpaceMinimalTestData: NoSpaceMinimalTestData[] = [];

  // This pulls data from our ourPlantData api page
  private REST_API_SERVER = "http://localhost:3000/api/minimalTestDataFilter?Habit=Shrub&SoilQueryType=Hardiness6&Soil=Y&ShadeQueryType=SoilLight&Shade=Y&PHQueryType=PHNeutral&PH=Y&FloweringQueryType=FloweringMay&Flowering=N";

  constructor(private httpClient: HttpClient) { 
  }

  // When this class is instantiated, the data is retrieved
  ngOnInit() {
  this.httpClient.get<any>(this.REST_API_SERVER).subscribe((response)=>{
    this.noSpaceMinimalTestData = response;
  });
}
}