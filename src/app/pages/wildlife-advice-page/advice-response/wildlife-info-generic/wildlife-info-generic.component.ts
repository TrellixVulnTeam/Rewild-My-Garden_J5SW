import { Component, Input, OnInit } from '@angular/core';
import { InfoGeneric } from '../../models/info.model';

@Component({
  selector: 'app-wildlife-info-generic',
  templateUrl: './wildlife-info-generic.component.html',
  styleUrls: ['./wildlife-info-generic.component.scss']
})
export class WildlifeInfoGenericComponent implements OnInit {

  @Input() infoGenericObject: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""}; 

  constructor() { }

  ngOnInit(): void {
  }

}
