import {Component, Input, OnInit} from '@angular/core';
import {Tasks} from "../../../../models/tasks";
import {TaskCategory} from "../../../../models/task-category";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit{

  @Input() task : Tasks;
  @Input() taskCategory : TaskCategory;

  users = ["assets/images/user-2.jpg", "assets/images/user-1.jpg"];


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


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

}
