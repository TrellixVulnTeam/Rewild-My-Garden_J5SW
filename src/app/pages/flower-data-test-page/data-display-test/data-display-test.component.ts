import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-data-display-test',
  templateUrl: './data-display-test.component.html',
  styleUrls: ['./data-display-test.component.scss']
})
export class DataDisplayTestComponent implements OnInit {
public flowerName = '';
public flowerCommonness = '';
public flowerAttractiveness = '';
flowers: any = [];

constructor(private dataService: DataService) { }

ngOnInit() {
  this.retrieveData();
}

retrieveData() {
  this.dataService.getAll().subscribe(
      data => {
        this.flowers = data;
        this.flowerName = this.flowers.name;
        this.flowerCommonness = this.flowers.commonness;
        this.flowerAttractiveness = this.flowers.prettiness;
      },
      error => {
        console.log(error);
      });
}
}
