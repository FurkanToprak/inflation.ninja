/* eslint-disable require-jsdoc */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: '/',
        index: 0,
      }, {
        label: 'Learn',
        link: '/learn',
        index: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find((tab) => {
        return tab.link === this.router.url;
      },
      ));
      console.log(`Change: ${this.activeLinkIndex}`);
    });
  }
}
