import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks-sketch',
  templateUrl: './tasks-sketch.component.html',
  styleUrls: ['./tasks-sketch.component.scss']
})
export class TasksSketchComponent implements OnInit {

  links: Array<any> = [
    {
      name: 'Dashboard',
      link: '/home',
      icon: 'dashboard',
      submenu: []
    },
    {
      name: 'Notifications',
      link: '/notifications',
      icon: 'notifications',
    },
    {
      name: 'Settings',
      link: '/settings',
      icon: 'setting',
    },
  ];

  @Input() linkTree: Array<any>;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
    iconRegistry.addSvgIcon(
      "dashboard",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/dashboard.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "notifications",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/notifications.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "setting",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/setting.svg"
      )
    );

  }

  ngOnInit() {
  }
}
