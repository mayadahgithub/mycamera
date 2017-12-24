import { Component } from '@angular/core';

/**
 * Generated class for the PageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page',
  templateUrl: 'page.html'
})
export class PageComponent {

  text: string;

  constructor() {
    console.log('Hello PageComponent Component');
    this.text = 'Hello World';
  }

}
