import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {


  // public gardenData = { Name: 'Latin Name',
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
// Other: 'Other'}; 

public string = 'placeholder';

constructor(private dataService: DataService) { }

ngOnInit() {
  this.retrieveData();
}

retrieveData() {
  this.dataService.getAll().subscribe(
      data => {
          this.string = getStringData(data);
      },
      error => {
        console.log(error);
      });
}
}

var getStringData = function(obj: Object){
  var tempString = '';
  let prop: keyof Object;
  for(prop in obj) {
      tempString += prop + ':  ' + obj[prop];
      tempString += "\n";
}
return tempString
}
