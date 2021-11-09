import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GridResponse } from '../grid-response.model';

@Component({
  selector: 'app-wildlife-advice-dialog',
  templateUrl: './wildlife-advice-dialog.component.html',
  styleUrls: ['./wildlife-advice-dialog.component.scss',],
  //check if this is correct
  template: 'passed in {{ data.name }}'
})
export class WildlifeAdviceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {monthData: GridResponse}) {
  }

  ngOnInit(): void {
  }

}

