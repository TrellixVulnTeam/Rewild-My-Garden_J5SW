import { Component, OnInit } from '@angular/core';
import { WildlifeAnswers } from '../wildlife-answers.service';

@Component({
  selector: 'app-wildlife-multiplechoice',
  templateUrl: './wildlife-multiplechoice.component.html',
  styleUrls: ['./wildlife-multiplechoice.component.scss']
})
export class WildlifeMultiplechoiceComponent implements OnInit {
  chosenSoilType: string = "";
  soilTypes: string[] = ['Light Soil', 'Medium Heavy Soil', 'Heavy Clay Soil'];
  chosenPHType: string = "";
  PHTypes: string[] = ['Acid', 'Neutral', 'Alkaline'];
  chosenShadeType: string = "";
  shadeTypes: string[] = ['Bright, not shady', 'Semi-shady', 'Full shade'];

  //Create 'multiple choice answers object' and send that to wildlife answers service

  constructor() { }
  ngOnInit(): void {
  }
}
