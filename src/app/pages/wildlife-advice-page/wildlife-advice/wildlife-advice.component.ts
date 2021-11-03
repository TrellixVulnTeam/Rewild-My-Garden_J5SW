import { Component, OnInit } from '@angular/core';
import { NoSpaceMinimalTestData } from '../../../noSpaceMinimalTestData.model'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

  public noSpaceMinimalTestData: NoSpaceMinimalTestData[] = [];
  //These variables are set so that we can query our api and filter data according to users' specifications
  private reqHabit = "Shrub";
  private reqSoilQueryType = "Hardiness6";
  private reqSoil = "Y";
  private reqShadeQueryType = "SoilLight";
  private reqShade = "Y";
  private reqPHQueryType = "PHNeutral";
  private reqPH = "Y";
  private reqFloweringQueryType = "FloweringMay";
  private reqFlowering = "N";

  // This pulls data from our minimalTestDataFilter api page
  private REST_API_SERVER = 
  "http://localhost:3000/api/minimalTestDataFilter?" + 
  "Habit=" + this.reqHabit + 
  "&SoilQueryType=" + this.reqSoilQueryType + 
  "&Soil=" + this.reqSoil +
  "&ShadeQueryType=" + this.reqShadeQueryType +
  "&Shade=" + this.reqShade +
  "&PHQueryType=" + this.reqPHQueryType +
  "&PH=" + this.reqPH + 
  "&FloweringQueryType=" + this.reqFloweringQueryType +
  "&Flowering=" + this.reqFlowering;

  constructor(private httpClient: HttpClient) { 
  }

  // When this class is instantiated, the data is retrieved
  ngOnInit() {
  this.httpClient.get<any>(this.REST_API_SERVER).subscribe((response)=>{
    this.noSpaceMinimalTestData = response;
  });
  }
}