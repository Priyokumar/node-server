import { Component, OnInit, Input } from '@angular/core';

export const links = [
  { name: "Home", url: "/", hasSubLinks: false },
  { name: "Admission", url: "/admission", hasSubLinks: false },
  { name: "Academy", url: "/academic", hasSubLinks: false },
  { name: "Contact us", url: "/contact-us", hasSubLinks: false }

];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input() sidenav: any;

  links = links;

  constructor() { }

  ngOnInit() {
  }

  onCLickAdmin() {

    window.open(window.location.origin + "/admin", "_blank");

  }

}
