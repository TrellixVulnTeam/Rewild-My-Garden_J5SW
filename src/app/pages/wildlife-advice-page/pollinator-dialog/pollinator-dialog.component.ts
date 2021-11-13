import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GridResponse } from '../grid-response.model';

@Component({
  selector: 'app-pollinator-dialog',
  templateUrl: './pollinator-dialog.component.html',
  styleUrls: ['./pollinator-dialog.component.scss']
})
export class PollinatorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GridResponse[]) {
  }

  ngOnInit(): void {
  }

}
