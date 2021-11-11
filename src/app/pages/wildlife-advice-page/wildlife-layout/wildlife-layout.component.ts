import { Component, OnInit } from '@angular/core';
import { WildlifeAnswerSet } from '../wildlife-answers.model';
import { WildlifeAnswers } from '../wildlife-answers.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  public multichoiceShow: boolean = true;

  constructor(public wildlifeAnswersService: WildlifeAnswers) {
    //When the advice set is produced, create advice Title and hide questions
    this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
      //We are using 'subscribe' to detect when 'save' has been clicked and data emitted
      //Here we are adding explanatory text by adding to innerHTML
      document.getElementById("adviceTitle")!.innerHTML = "Plants Recommended for Your Garden";
      document.getElementById("adviceText")!.innerHTML = "It is helpful to have plants flowering in your garden from spring to autumn. Each plant blooms in the month specified and suits your garden, so you can make your garden a home to pollinators all year.";
      //Here we are toggling the visibility of the grid using css
      document.getElementById('adviceGridID')!.classList.remove('adviceGrid');
      // Here we are using ngIf to toggle visibility of multichoice Q
      this.multichoiceShow = false;
    });
  }

  ngOnInit(): void {
  }

}
