import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdviceGeneric } from "../../models/advice.model";
import { AdviceSave } from "../../models/save-advice.model";
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

  //Code used to output when someone wants to save a piece of advice
  private isChecked : boolean = false;

  @Output() newSaveEvent = new EventEmitter();
  @Output() newRemoveEvent = new EventEmitter();

  // make changes to the array in wildlifeLayout
  toggleSave(){
    if(!this.isChecked){
      this.addNewSave();
      this.isChecked = true;
    } 
    else{
      this.removeSave();
      this.isChecked = false;
    }
  }
  
  private removeSave(){
    this.newRemoveEvent.emit(this.adviceGenericObject.Header);
  }

  private addNewSave() {
    const saveObj: AdviceSave =
        {
          Header: this.adviceGenericObject.Header,
          Pathname: this.adviceGenericObject.Pathname,
          Name: this.adviceGenericObject.Name,
          Username: this.adviceGenericObject.Username,
          Copyright: this.adviceGenericObject.Copyright,
          Link: this.adviceGenericObject.Link
        };

    this.newSaveEvent.emit(saveObj);
  }

  ngOnInit(): void {}
}
