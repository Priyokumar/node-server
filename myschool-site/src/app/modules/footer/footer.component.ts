import { Component, OnInit } from '@angular/core';
import { links } from '../header/header.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links = links;

  constructor() { }

  ngOnInit() {
  }

}
