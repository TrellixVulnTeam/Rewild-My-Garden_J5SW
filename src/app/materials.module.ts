import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
      MatTabsModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatInputModule,
      MatCardModule,
      MatRadioModule,
      MatGridListModule,
      MatDialogModule,
      MatFormFieldModule
    ],
    exports: [
        MatTabsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatRadioModule,
        MatGridListModule,
        MatDialogModule,
        MatFormFieldModule
    ]
  })

  export class MatModule { }
