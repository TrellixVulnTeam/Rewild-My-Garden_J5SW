import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdviceGeneric } from "../../models/advice.model";
import { WildlifeAdviceDialogComponent } from "../wildlife-advice-dialog/wildlife-advice-dialog.component";

@Component({
  selector: "app-wildlife-advice-generic",
  templateUrl: "./wildlife-advice-generic.component.html",
  styleUrls: ["./wildlife-advice-generic.component.scss"],
})
export class WildlifeAdviceGenericComponent implements OnInit {
  @Input() adviceGenericObject: AdviceGeneric = {
    Header: "",
    WindoxBox: "",
    OutdoorPlantPots: "",
    SmallGarden: "",
    LargeGarden: "",
    Allotment: "",
    FieldFields: "",
    Justification: "",
    BodyText: "",
    Pathname: "",
    Name: "",
    Username: "",
    Copyright: "",
    Link: "",
  };

  constructor(public dialog: MatDialog) {}

  //this function is passed the correct month data through the HTML
  public openDialog(adviceGenericObject: AdviceGeneric) {
    const dialogRef = this.dialog.open(WildlifeAdviceDialogComponent, {
      height: "350px",
      width: "750px",
      data: adviceGenericObject,
    });
  }

  ngOnInit(): void {}
}
