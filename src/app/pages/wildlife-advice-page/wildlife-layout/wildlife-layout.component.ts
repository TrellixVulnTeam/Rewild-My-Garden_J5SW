import { Component, OnInit } from '@angular/core';
import { WildlifeAnswerSet } from '../wildlife-answers.model';
import { WildlifeAnswers } from '../wildlife-answers.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  constructor(public wildlifeAnswersService: WildlifeAnswers) {
    //here we are subscribing to the listener
    this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
      document.getElementById("adviceTitle")!.innerHTML = "Plants Recommended for Your Garden";
    });
  }

  ngOnInit(): void {
  }

}
