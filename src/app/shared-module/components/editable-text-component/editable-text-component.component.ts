import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-editable-text-component',
  templateUrl: './editable-text-component.component.html',
  styleUrls: ['./editable-text-component.component.scss']
})
export class EditableTextComponentComponent {
  @Input() editType: 'input' | 'textarea' = 'input';
  @Input() editableText: string = "Cliquez pour éditer";
  editMode: boolean = false;
  @Output() textChanged : EventEmitter<string> = new EventEmitter<string>();


  saveEdit() {
    this.editMode = false;
    this.textChanged.emit(this.editableText); // Émet l'événement avec la nouvelle valeur
  }

  cancelEdit() {
    this.editMode = false;
  }
}
