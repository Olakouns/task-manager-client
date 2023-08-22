import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskCategory} from "../../../models/task-category";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Tasks} from "../../../models/tasks";

@Component({
  selector: 'app-tasks-category',
  templateUrl: './tasks-category.component.html',
  styleUrls: ['./tasks-category.component.scss']
})
export class TasksCategoryComponent implements OnInit {
  @Input() taskCategory: TaskCategory;
  @Output() onEditEmit : EventEmitter<TaskCategory> = new EventEmitter<TaskCategory>();

  todo = ['Get to work'];

  users = ["assets/images/user-2.jpg", "assets/images/user-1.jpg"];

  tasks : Array<Tasks> = new Array<Tasks>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "addCircle",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/add-circle.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "moreH",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/more-h.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "addSimple",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/add-simple.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "comments",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/comments.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "attachFile",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/attach-file.svg"
      )
    );
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
