import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { InfoGeneric } from '../../models/info.model';

@Component({
  selector: 'app-wildlife-info-generic',
  templateUrl: './wildlife-info-generic.component.html',
  styleUrls: ['./wildlife-info-generic.component.scss']
})
export class WildlifeInfoGenericComponent implements OnInit {

  @Input() infoGenericObject: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourBodyText: String = "";

  constructor() { }

  ngOnInit(): void {

  }

  //change info file to take out quote marks around 'here' *********
  ngOnChanges(changes: SimpleChanges) {
    this.ourBodyText = "<b>" + changes.infoGenericObject.currentValue.Title + ":</b>" + " " + changes.infoGenericObject.currentValue.BodyText;
  }
}
