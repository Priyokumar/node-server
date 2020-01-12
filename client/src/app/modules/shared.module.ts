import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../components/shared/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePreviewComponent } from '../components/shared/image-preview/image-preview.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FileUploadComponent, ImagePreviewComponent],
  exports: [FileUploadComponent, ImagePreviewComponent],
  entryComponents: [ImagePreviewComponent]
})
export class SharedModule { }
