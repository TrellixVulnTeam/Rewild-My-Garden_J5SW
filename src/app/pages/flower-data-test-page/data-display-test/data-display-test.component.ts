import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-data-display-test',
  templateUrl: './data-display-test.component.html',
  styleUrls: ['./data-display-test.component.scss']
})
export class DataDisplayTestComponent implements OnInit {
public flowerOne = {name: 'noName', commonness: 'noCommon', prettiness: 'noPretty'};
// var ourData;
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
