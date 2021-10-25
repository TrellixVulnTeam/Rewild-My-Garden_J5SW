import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { PlantData } from '../../../plantdata.model';  

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

public string = 'placeholder';
public plantData: PlantData[] = [];

constructor(private dataService: DataService) { }

// When this class is instantiated, the data is retrieved
ngOnInit() {
  this.retrieveData();
}

// This gets the data from dataservice and calls our stringify method or an error
retrieveData() {
  this.plantData = this.dataService.getAll();
}

// This turns the data into a nice string object for display
// var getStringData = function(obj: Object){
//   var tempString = '';
//   let prop: keyof Object;
//   for(prop in obj) {
//       tempString += prop + ':  ' + obj[prop];
//       tempString += "\n";
// }
// return tempString
}
