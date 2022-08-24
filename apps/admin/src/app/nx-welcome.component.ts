import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {interval} from "rxjs";

/* eslint-disable */

@Component({
  selector: 'app-nx-welcome',
  template: `
    Hi!!! {{timer}}
  `,
  styles: [`
    :host {
    background: red;
    display: block;
  }`],
})
export class NxWelcomeComponent implements OnInit {
  constructor() {}

  timer = 0;

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.timer += 1;
    })
  }
}
