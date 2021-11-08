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
      document.getElementById("adviceText")!.innerHTML = "It is helpful to have plants flowering in your garden from spring to autumn. Each plant blooms in the month specified and suits your garden, so you can make your garden a home to pollinators all year.";
      this.show = false;
    });
  }

  ngOnInit(): void {
  }

}
