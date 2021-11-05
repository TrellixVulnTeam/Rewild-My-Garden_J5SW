import { Component, OnInit } from '@angular/core';
import { WildlifeAnswerSet } from '../wildlife-answers.model';
import { WildlifeAnswers } from '../wildlife-answers.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  public show: boolean = true;

  constructor(public wildlifeAnswersService: WildlifeAnswers) {
    //When the advice set is produced, create advice Title and hide questions
    this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
      document.getElementById("adviceTitle")!.innerHTML = "Plants Recommended for Your Garden";
      this.show = false;
    });
  }

  ngOnInit(): void {
  }

}
