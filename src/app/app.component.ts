import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @ViewChild('container') myDiv: ElementRef | undefined;
  @ViewChild('containerImages') myImages: ElementRef | undefined;
  title = 'dom';
  imgDiv=false;
  dogBreed: string[] = [];
  dogBreedImages: string[] = [];

  breedURI = 'https://dog.ceo/api/breeds/list/all';

  async ngOnInit() {
    const response = await fetch(this.breedURI);
    const message = await response.json();
    this.dogBreed = Object.keys(message.message);
    console.log(this.dogBreed);
    this.showBreeds();
  }

  showBreeds() {
    // this will call for each breed
    this.dogBreed.forEach((breed: string) => {
      const newElement = this.renderer.createElement('div');
      const text = this.renderer.createText(breed);
      this.renderer.addClass(newElement, 'breed-class');
      // newElement.addEventListener('click', this.call(breed));
      // Add click event listener to the new element
      this.renderer.listen(newElement, 'click', () => {
        this.call(breed);
      });
      this.renderer.appendChild(newElement, text);
      this.renderer.appendChild(this.myDiv?.nativeElement, newElement);
    });
  }

  async call(breed: string) {
    this.imgDiv=true;
    const url = `https://dog.ceo/api/breed/${breed}/images`;
    const response = await fetch(url);
    const message = await response.json();    
    this.dogBreedImages = message.message;
    
  }

  showImages() {
    this.dogBreedImages.forEach((img: string) => {
      const imgEl = this.renderer.createElement('img');
      this.renderer.setAttribute(imgEl, 'src', img);
      this.renderer.addClass(imgEl, 'img-class');
      this.renderer.appendChild(this.myDiv?.nativeElement, imgEl);
    });
  }

  close(){
    this.imgDiv=false;
  }

  add() {
    const newElement = this.renderer.createElement('div');
    const text = this.renderer.createText('This is a new element');
    this.renderer.appendChild(newElement, text);
    this.renderer.appendChild(document.body, newElement);
  }
}
