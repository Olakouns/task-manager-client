import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent {
  @Input() title: String;
  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "close_circle",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/close-circle.svg"
      )
    );
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
