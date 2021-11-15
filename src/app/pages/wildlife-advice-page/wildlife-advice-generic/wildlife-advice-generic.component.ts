import { Component, Input, OnInit } from '@angular/core';
import { AdviceGeneric } from '../models/advice.model';

@Component({
  selector: 'app-wildlife-advice-generic',
  templateUrl: './wildlife-advice-generic.component.html',
  styleUrls: ['./wildlife-advice-generic.component.scss']
})
export class WildlifeAdviceGenericComponent implements OnInit {

  @Input() adviceGenericObject: AdviceGeneric = {"Header": "", WindoxBox: "", OutdoorPlantPots: "", SmallGarden: "", LargeGarden: "", Allotment: "", FieldFields: "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""}; 

  constructor() { }

  ngOnInit(): void {
  }
}
