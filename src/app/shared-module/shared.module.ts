import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {DialogSketchComponent} from './components/dialog-sketch/dialog-sketch.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import localeFr from '@angular/common/locales/fr';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { EditableTextComponentComponent } from './components/editable-text-component/editable-text-component.component';
registerLocaleData(localeFr);



@NgModule({
  declarations: [
    DialogSketchComponent,
    SimpleDialogComponent,
    EditableTextComponentComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    DialogSketchComponent,
    NgxSkeletonLoaderModule,
    MatTooltipModule,
    MatChipsModule,
    MatMomentDateModule,
    SimpleDialogComponent,
    EditableTextComponentComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
  ]
})
export class SharedModule {
}
