import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  linkTree: Array<any> = [
    {
      name: "Notifications",
      link: '/notifications'
    }
  ];
}
