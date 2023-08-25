import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dashboard} from "../../../models/dashboard";

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit{
  @Input() dashboard: Dashboard;
  @Output() onEditEmit: EventEmitter<Dashboard> = new EventEmitter<Dashboard>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
