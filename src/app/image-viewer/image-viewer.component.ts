import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  @Input() images:string[] | undefined;

  ngOnChanges(changes:SimpleChanges){
    console.log("changes",this.images);
  }

}
