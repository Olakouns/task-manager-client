import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-dialog-sketch',
  templateUrl: './dialog-sketch.component.html',
  styleUrls: ['./dialog-sketch.component.scss']
})
export class DialogSketchComponent {
  @Input() title: String;
  @Input() validateText: String;
  @Input() data: any;
  @Input() form: FormGroup;
  @Input() isLoading: boolean;
  @Output() onFormSubmitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<DialogSketchComponent>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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

  onSubmit() {
    this.onFormSubmitted.emit(this.data);
  }
}
